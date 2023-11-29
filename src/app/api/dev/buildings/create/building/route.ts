import { NextRequest, NextResponse } from 'next/server'
import { RESPONSES, secureEndpoint } from '@/utils/backend'
import { db } from '@/db'
import { cBuilding } from '@/db/schema'

export async function POST(req: NextRequest) {
  if (await secureEndpoint(req)) {
    return RESPONSES.UNAUTHORIZED
  }

  const { name, codeName, sector, description, maxLevel } = await req.json()

  const createBuilding = await db
    .insert(cBuilding)
    .values({
      maxLevel,
      name,
      codeName,
      sector,
      description,
    })
    .returning()

  return NextResponse.json({ status: 'success', building: createBuilding }, { status: 200 })
}
