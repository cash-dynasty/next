import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

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
        const user = { id: '6', name: 'Marcin', password: 'elo', role: 'admin' }

        if (credentials?.username === user.name && credentials?.password === user.password) {
          return user
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
