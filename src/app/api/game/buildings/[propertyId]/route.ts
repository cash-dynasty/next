import { RESPONSES, secureEndpoint } from '@/utils/backend'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { getToken } from 'next-auth/jwt'
import { eq } from 'drizzle-orm'
import { building, player } from '@/db/schema'

export async function GET(
  req: NextRequest,
  { params: { propertyId } }: { params: { propertyId: number } },
) {
  const token = await getToken({ req })
  if ((await secureEndpoint(req)) || !token) {
    return RESPONSES.UNAUTHORIZED
  }

  const playerData = await db.query.player.findFirst({
    where: eq(player.userId, token.id),
    with: {
      property: true,
    },
  })

  if (playerData) {
    const foundProperty = playerData.property.find((el) => el.id === +propertyId)
    if (foundProperty) {
      const buildings = await db.query.building.findMany({
        where: eq(building.propertyId, foundProperty.id),
        with: {
          configBuilding: true,
        },
      })
      return NextResponse.json({ status: 'success', buildings }, { status: 200 })
    }
  }
  return NextResponse.json(
    { status: 'failed', message: 'You are not allowed to read buildings for this property' },
    { status: 200 },
  )
}
