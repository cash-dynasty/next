import { RESPONSES, secureEndpoint } from '@/utils/backend'
import { NextRequest, NextResponse } from 'next/server'

// import { configBuilding, configRequiredBuilding } from '@/db/schema'

export async function GET(req: NextRequest) {
  if (await secureEndpoint(req)) {
    return RESPONSES.UNAUTHORIZED
  }

  // const buildings = await db
  //   .select()
  //   .from(configBuilding)
  //   .leftJoin(configRequiredBuilding, eq(configBuilding.id, configRequiredBuilding.buildingId))
  // .groupBy(configRequiredBuilding.buildingId)

  // const b = await db.query.configBuilding.findMany({
  //   orderBy: [asc(configBuilding.maxLevel)],
  // })
  //
  // console.log(buildings)

  return NextResponse.json({ status: 'success', data: 'b' }, { status: 200 })
}
