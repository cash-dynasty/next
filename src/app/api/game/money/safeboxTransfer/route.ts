import { NextRequest, NextResponse } from 'next/server'
import { RESPONSES, secureEndpoint } from '@/utils/backend'
import { player, property, safeboxTransfers } from '@/db/schema'

import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { getToken } from 'next-auth/jwt'

export async function POST(req: NextRequest) {
  if (await secureEndpoint(req)) {
    return RESPONSES.UNAUTHORIZED
  }

  const token = await getToken({ req })

  if (token) {
    const { propertyId, amount, type } = await req.json()

    const playerData = await db.query.player.findFirst({
      where: eq(player.userId, token.id),
      with: {
        property: {
          where: eq(property.id, propertyId),
        },
      },
    })

    if (!playerData) {
      return RESPONSES.AUTH_USER_NOT_FOUND
    }

    const safeboxTransferData = await db.insert(safeboxTransfers).values({
      amount,
      type,
      playerId: playerData.id,
      propertyId,
    })

    await db
      .update(property)
      .set({
        blockedFundsAmount: playerData.property[0].blockedFundsAmount + amount,
      })
      .where(eq(property.id, propertyId))
      .execute()

    await db
      .update(player)
      .set({
        moneyBalance: playerData.moneyBalance - amount,
      })
      .where(eq(player.id, playerData.id))
      .execute()
  }

  return NextResponse.json({ status: 'success', data: 'data_here' }, { status: 200 })
}
