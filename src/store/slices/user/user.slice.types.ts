import { User } from '@prisma/client'

export type UserState = {
  user: Partial<User> | null
}

export type SetUserPayload = {
  user: Partial<User>
}
