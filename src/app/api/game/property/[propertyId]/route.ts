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

  console.log(propertyData)

  return NextResponse.json({ status: 'success', property: propertyData }, { status: 200 })
}
