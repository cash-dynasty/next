import { NextRequest, NextResponse } from 'next/server'
import { RESPONSES, secureEndpoint } from '@/utils/backend'
import { getToken } from 'next-auth/jwt'
import { db } from '@/db'
import { building, cBuilding, player, property } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(req: NextRequest) {
  const token = await getToken({ req })
  if ((await secureEndpoint(req)) || !token) {
    return RESPONSES.UNAUTHORIZED
  }

  const { sector, nickname } = await req.json()

  const playerData = await db
    .insert(player)
    .values({
      nickname,
      userId: token.id,
    })
    .returning()

  const propertyData = await db
    .insert(property)
    .values({
      sector,
      name: `Pierwsza firma ${nickname}`,
      ownerId: playerData[0].id,
    })
    .returning()

  const cBuildingsData = await db.query.cBuilding.findMany({
    where: eq(cBuilding.sector, sector),
  })

  const propertyBuildings = cBuildingsData.map((building) => ({
    level: 0,
    configBuildingId: building.id,
    propertyId: propertyData[0].id,
  }))

  const buildingsData = await db.insert(building).values(propertyBuildings).returning()

  return NextResponse.json({ status: 'success', data: buildingsData }, { status: 200 })
}
