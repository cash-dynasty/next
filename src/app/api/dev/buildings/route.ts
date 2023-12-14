import { NextResponse } from 'next/server'
import { db } from '@/db'
import { cBuilding, cBuildingUpgradeRequirement } from '@/db/schema'
import { asc } from 'drizzle-orm'

export async function GET() {
  // if (await secureEndpoint(req)) {
  //     return RESPONSES.UNAUTHORIZED
  // }

  const buildings = await db.query.cBuilding.findMany({
    with: {
      buildingUpgradeRequirement: {
        orderBy: asc(cBuildingUpgradeRequirement.level),
        columns: {
          buildingId: false,
        },
        with: {
          requiredBuilding: {
            with: {
              building: {
                columns: {
                  description: false,

                },
              },
            },
            columns: {
              buildingUpgradeRequirementId: false,
              buildingId: false,
            },
          },
        },
      },
    },
    orderBy: asc(cBuilding.id),
  })

  console.log(buildings)

  return NextResponse.json({ status: 'success', buildings }, { status: 200 })
}
