import { NextRequest, NextResponse } from 'next/server'
import { RESPONSES, secureEndpoint } from '@/utils/backend'
import { db } from '@/db'
import { cBuilding } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function PUT(req: NextRequest) {
  if (await secureEndpoint(req)) {
    return RESPONSES.UNAUTHORIZED
  }

  const { name, sector, description, maxLevel, id } = await req.json()

  const updateBuilding = await db
    .update(cBuilding)
    .set({
      maxLevel,
      name,
      sector,
      description,
    })
    .where(eq(cBuilding.id, id))
    .returning()

  return NextResponse.json({ status: 'success', building: updateBuilding }, { status: 200 })
}
