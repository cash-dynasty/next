import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { db } from '@/db'
import { user as dbUser } from '@/db/schema'
import { eq } from 'drizzle-orm'
import * as bcrypt from 'bcrypt'

export const options: NextAuthOptions = {
  providers: [
    //TODO add google provider
    CredentialsProvider({
      type: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null
        const user = await db
          .selectDistinct({
            id: dbUser.id,
            email: dbUser.email,
            role: dbUser.role,
            password: dbUser.password,
            isActive: dbUser.isActive,
          })
          .from(dbUser)
          .where(eq(dbUser.email, credentials.email))
          .limit(1)

        if (user) {
          if (!user[0].isActive) {
            throw new Error(
              JSON.stringify({ message: 'Account is not active', code: 'account_inactive' }),
            )
          }
          const checkPassword = await bcrypt.compare(credentials.password, user[0].password)
          if (checkPassword) {
            return { id: user[0].id, email: user[0].email, role: user[0].role }
          }
        }
        throw new Error(
          JSON.stringify({ message: 'Credentials incorrect', code: 'wrong_credentials' }),
        )
      },
    }),
  ],
  pages: {
    newUser: 'auth/register',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = +user.id
        token.role = user.role
        token.email = user.email
      }
      return token
    },
    // If you want to use the role in client components
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.email = token.email
      }
      return session
    },
  },
}
