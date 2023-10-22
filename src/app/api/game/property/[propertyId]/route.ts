import { NextRequest, NextResponse } from 'next/server'
import { RESPONSES, secureEndpoint } from '@/utils/backend'
import { prisma } from '@/utils/db'
import { TProperty } from '@/types/property'
import { TBuilding } from '@/types/building'

export async function GET(
  req: NextRequest,
  {
    params: { propertyId },
  }: {
    params: {
      propertyId: string
    }
  },
) {
  if (await secureEndpoint(req)) {
    return RESPONSES.UNAUTHORIZED
  }

  const data = await prisma.property.findFirst({
    where: {
      id: propertyId,
    },
    include: {
      buildings: {
        include: {
          configBuilding: {
            include: {
              requirements: {
                include: {
                  requiredBuildings: {
                    select: {
                      buildingId: true,
                      buildingLevel: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })

  const property: TProperty = {
    ...data,
    buildings: data?.buildings.map((building: TBuilding) => {
      const requirements = building?.configBuilding?.requirements?.find(
        (req) => req.level === building.level + 1,
      )
      return {
        buildingId: building.id,
        level: building.level,
        building: building.configBuildingId,
        buildingName: building?.configBuilding?.name,
        maxLevel: building?.configBuilding?.maxLevel,
        upgrade: {
          price: requirements?.upgradePrice ?? undefined,
          requiredBuildings: requirements?.requiredBuildings ?? undefined,
          duration: requirements?.upgradeDuration,
        },
      }
    }),
  }

  return NextResponse.json({ status: 'success', property }, { status: 200 })
}
