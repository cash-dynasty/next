import * as bcrypt from 'bcrypt'

import CredentialsProvider from 'next-auth/providers/credentials'
import type { NextAuthOptions } from 'next-auth'
import { db } from '@/db'
import { user as dbUser } from '@/db/schema'
import { eq } from 'drizzle-orm'

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
        const user = await db.query.user.findFirst({
          where: eq(dbUser.email, credentials.email),
        })

        if (user) {
          if (!user.isActive) {
            throw new Error(
              JSON.stringify({ message: 'Account is not active', code: 'account_inactive' }),
            )
          }
          const checkPassword = await bcrypt.compare(credentials.password, user.password)
          if (checkPassword) {
            return { id: user.id, email: user.email, role: user.role }
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
