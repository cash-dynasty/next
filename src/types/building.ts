import { Prisma } from '@prisma/client'

export type TBuilding = Prisma.BuildingGetPayload<{
  include: {
    configBuilding: {
      include: {
        requirements: {
          include: {
            requiredBuildings: true
          }
        }
      }
    }
  }
}>
