// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultUser } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: number
      role: string
      email: string
    }
  }

  interface User extends DefaultUser {
    id: number
    role: string
    email: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: number
    role: string
    email: string
  }
}
