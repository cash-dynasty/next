import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/utils/db'
import bcrypt from 'bcrypt'
import { normalizeText } from '@/utils/textFormatters'

export const options: NextAuthOptions = {
  providers: [
    //TODO add google provider
    CredentialsProvider({
      type: 'credentials',
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username:',
          type: 'text',
          placeholder: 'Your username',
        },
        password: {
          label: 'Password:',
          type: 'password',
          placeholder: 'Your secret password',
        },
      },
      async authorize(credentials) {
        if (!credentials) return null
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              {
                username: {
                  equals: normalizeText(credentials.username),
                },
              },
              {
                email: {
                  equals: normalizeText(credentials.username),
                },
              },
            ],
          },
        })

        if (user) {
          const checkPassword = await bcrypt.compare(
            credentials.password,
            user.password,
          )
          if (checkPassword) {
            return user
          }
        }

        return null
      },
    }),
  ],
  pages: {
    newUser: 'auth/register',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role
      return token
    },
    // If you want to use the role in client components
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role
      return session
    },
  },
}
