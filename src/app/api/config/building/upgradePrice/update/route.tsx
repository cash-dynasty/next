import { NextRequest, NextResponse } from 'next/server'
import { RESPONSES, secureEndpoint } from '@/utils/backend'
import { db } from '@/db'
import { cBuildingUpgradeRequirement } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function PUT(req: NextRequest) {
  if (await secureEndpoint(req)) {
    return RESPONSES.UNAUTHORIZED
  }

  const { buildingUpgradeRequirementId, upgradePrice } = await req.json()

  const updatePrice = await db
    .update(cBuildingUpgradeRequirement)
    .set({
      upgradePrice,
    })
    .where(eq(cBuildingUpgradeRequirement.id, buildingUpgradeRequirementId))
    .returning()

  return NextResponse.json({ status: 'success', building: updatePrice }, { status: 200 })
}
