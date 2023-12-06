import { NextRequest, NextResponse } from 'next/server'
import { RESPONSES, secureEndpoint } from '@/utils/backend'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { property } from '@/db/schema'

export async function GET(
  req: NextRequest,
  {
    params: { propertyId },
  }: {
    params: {
      propertyId: number
    }
  },
) {
  if (await secureEndpoint(req)) {
    return RESPONSES.UNAUTHORIZED
  }

  const propertyData = await db.query.property.findFirst({
    where: eq(property.id, propertyId),
    with: {
      buildings: {
        columns: {
          configBuildingId: false,
          propertyId: false,
        },
        with: {
          configBuilding: {
            columns: {
              sector: false,
              description: false,
            },
            with: {
              buildingUpgradeRequirement: {
                with: { building: true },
                columns: {
                  buildingId: false,
                },
              },
            },
          },
        },
      },
    },
  })

  //
  // const property1: TProperty = {
  //   ...data,
  //   buildings: data?.buildings.map((building: TBuilding) => {
  //     const requirements = building?.configBuilding?.requirements?.find(
  //       (req) => req.level === building.level + 1,
  //     )
  //     return {
  //       buildingId: building.id,
  //       level: building.level,
  //       building: building.configBuildingId,
  //       buildingName: building?.configBuilding?.name,
  //       maxLevel: building?.configBuilding?.maxLevel,
  //       upgrade: {
  //         price: requirements?.upgradePrice ?? undefined,
  //         requiredBuildings: requirements?.requiredBuildings ?? undefined,
  //         duration: requirements?.upgradeDuration,
  //       },
  //     }
  //   }),
  // }

  return NextResponse.json({ status: 'success', property: propertyData }, { status: 200 })
}
