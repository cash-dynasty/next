import { prisma } from '@/utils/db'
import { Sector } from '@prisma/client'
import { buildings } from '@/schemas/buildings'

const seed = async () => {
  for (const building of buildings) {
    await prisma.config_Building
      .create({
        data: {
          id: building.id,
          name: building.name,
          maxLevel: building.maxLevel,
          description: building.description,
          sector: building.sector as Sector,
          requirements: {
            create: Object.entries(building.requirements).map(([level, requirement], index) => {
              console.log(`requirements ${index}`, level, requirement)
              return {
                id: `${building.id}_${level}`,
                level: +level,
                upgradePrice: requirement.upgradePrice,
              }
            }) as [],
          },
        },
      })
      .then((res) => console.log(res))
  }

  for (const building of buildings) {
    await prisma.config_Building.update({
      where: { id: building.id },
      data: {
        requirements: {
          update: Object.entries(building.requirements || {}).map(([level, requirement]) => {
            return {
              where: { id: `${building.id}_${level}` },
              data: {
                requiredBuildings: {
                  connectOrCreate: Object.entries(requirement.requiredBuildings || {}).map(
                    ([requiredBuildingId, requiredBuildingLevel]) => {
                      return {
                        where: { id: `r_${requiredBuildingId}_${requiredBuildingLevel}` },
                        create: {
                          id: `r_${requiredBuildingId}_${requiredBuildingLevel}`,
                          buildingId: requiredBuildingId,
                          buildingLevel: requiredBuildingLevel,
                        },
                      }
                    },
                  ),
                },
              },
            }
          }) as [],
        },
      },
    })
  }

  await prisma.user.create({
    data: {
      email: 'marcin.wiatrak.95@gmail.com',
      username: 'wicherixen',
      password: '$2b$10$I0Puf10PXcUa8LLh8IuA/.zw57MtqOjENbgCB/4NEbEWORCUUYp..',
      role: 'ADMIN',
      isConfirmed: true,
      player: {
        create: {
          name: 'wicherixen',
          moneyBalance: 1000,
          income: 500,
          properties: { create: { name: 'pierwsza firma' } },
        },
      },
    },
  })
  await prisma.user.create({
    data: {
      email: 'demorhul@gmail.com',
      username: 'vezo',
      password: '$2b$10$rWSyJmVI5ODqF2kZH/wCneSjIoIgLTrn9W0GUw9XY4qU1jl0sGpQK',
      role: 'ADMIN',
      isConfirmed: true,
      player: {
        create: {
          name: 'vezo',
          moneyBalance: 1000,
          income: 500,
          properties: { create: { name: 'pierwsza firma' } },
        },
      },
    },
  })
  await prisma.user.create({
    data: {
      email: 'dkl.kazmierczak@gmail.com',
      username: 'laurel',
      password: '$2b$10$I0Puf10PXcUa8LLh8IuA/.zw57MtqOjENbgCB/4NEbEWORCUUYp..',
      role: 'ADMIN',
      isConfirmed: true,
      player: {
        create: {
          name: 'laurel',
          moneyBalance: 1000,
          income: 500,
          properties: { create: { name: 'pierwsza firma' } },
        },
      },
    },
  })
  await prisma.user.create({
    data: {
      email: 'adrianiix97@gmail.com',
      username: 'adrianiix',
      password: '$2b$10$I0Puf10PXcUa8LLh8IuA/.zw57MtqOjENbgCB/4NEbEWORCUUYp..',
      role: 'ADMIN',
      isConfirmed: true,
      player: {
        create: {
          name: 'adrianiix',
          moneyBalance: 1000,
          income: 500,
          properties: { create: { name: 'pierwsza firma' } },
        },
      },
    },
  })
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
