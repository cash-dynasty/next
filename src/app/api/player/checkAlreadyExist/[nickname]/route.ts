import { RESPONSES, secureEndpoint } from '@/utils/backend'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { player } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(
  req: NextRequest,
  { params: { nickname } }: { params: { nickname: string } },
) {
  if (await secureEndpoint(req)) {
    return RESPONSES.UNAUTHORIZED
  }

  const isPlayerExist = await db
    .selectDistinct()
    .from(player)
    .where(eq(player.nickname, nickname))
    .execute()

  const nicknameAvailable = !isPlayerExist.length

  return NextResponse.json({ status: 'success', nicknameAvailable }, { status: 200 })
}
