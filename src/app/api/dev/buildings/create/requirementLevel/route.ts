import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { cBuildingUpgradeRequirement } from '@/db/schema'

export async function POST(req: NextRequest) {
  // if (await secureEndpoint(req)) {
  //     return RESPONSES.UNAUTHORIZED
  // }

  const { buildingId, level, upgradePrice } = await req.json()

  const createBuildingUpgradeRequirement = await db
    .insert(cBuildingUpgradeRequirement)
    .values({
      buildingId,
      level,
      upgradePrice,
    })
    .returning()

  return NextResponse.json(
    { status: 'success', requirement: createBuildingUpgradeRequirement },
    { status: 200 },
  )
}
