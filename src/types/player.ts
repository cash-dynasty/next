import { Prisma } from '@prisma/client'

export type TPlayer = Prisma.PlayerGetPayload<{
  include: {
    properties: true
  }
}>
