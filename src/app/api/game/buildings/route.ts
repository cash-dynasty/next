import { RESPONSES, secureEndpoint } from '@/utils/backend'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { configBuilding, configRequiredBuilding } from '@/db/schema'
import { asc, eq } from 'drizzle-orm'

export async function GET(req: NextRequest) {
  if (await secureEndpoint(req)) {
    return RESPONSES.UNAUTHORIZED
  }

  const buildings = await db
    .select()
    .from(configBuilding)
    .leftJoin(configRequiredBuilding, eq(configBuilding.id, configRequiredBuilding.buildingId))
  // .groupBy(configRequiredBuilding.buildingId)

  const b = await db.query.configBuilding.findMany({
    orderBy: [asc(configBuilding.maxLevel)],
  })

  console.log(buildings)

  return NextResponse.json({ status: 'success', data: b }, { status: 200 })
}
