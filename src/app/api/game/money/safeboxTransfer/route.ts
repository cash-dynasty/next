import { NextRequest, NextResponse } from 'next/server'
import { RESPONSES, secureEndpoint } from '@/utils/backend'
import { eq, sql } from 'drizzle-orm'
import { player, property, safeboxTransfers } from '@/db/schema'

import { db } from '@/db'
import { getToken } from 'next-auth/jwt'

export async function POST(req: NextRequest) {
  if (await secureEndpoint(req)) {
    return RESPONSES.UNAUTHORIZED
  }

  const token = await getToken({ req })

  if (token) {
    const { propertyId, amount, type } = await req.json()

    db.transaction(async (trx) => {
      const playerData = await trx.query.player.findFirst({
        where: eq(player.userId, token.id),
        with: {
          property: {
            where: eq(property.id, propertyId),
          },
        },
      })
      if (!playerData || !playerData.property[0]) {
        return RESPONSES.AUTH_USER_NOT_FOUND
      }

      await trx
        .update(property)
        .set({
          blockedFundsAmount: sql`${property.blockedFundsAmount} + ${amount}`,
          moneyBalance: sql`${property.moneyBalance} - ${amount}`,
        })
        .where(eq(propertyId, playerData.property[0].id))
        .execute()

      await trx.insert(safeboxTransfers).values({
        amount,
        type,
        propertyId,
      })
    })
  }

  return NextResponse.json({ status: 'success', data: 'data_here' }, { status: 200 })
}
