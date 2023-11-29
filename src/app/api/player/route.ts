import { NextRequest, NextResponse } from 'next/server'
import { RESPONSES, secureEndpoint } from '@/utils/backend'
import { db } from '@/db'
import { getToken } from 'next-auth/jwt'
import { eq } from 'drizzle-orm'
import { player } from '@/db/schema'

export async function GET(req: NextRequest) {
  const token = await getToken({ req })
  if ((await secureEndpoint(req)) || !token) {
    return RESPONSES.UNAUTHORIZED
  }

  const playerData = await db.query.player.findFirst({
    where: eq(player.userId, token.id),
  })

  return NextResponse.json({ status: 'success', player: playerData }, { status: 200 })
}
