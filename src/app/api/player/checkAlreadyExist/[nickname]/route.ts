import { RESPONSES, secureEndpoint } from '@/utils/backend'
import { prisma } from '@/utils/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params: { nickname } }: { params: { nickname: string } },
) {
  if (await secureEndpoint(req)) {
    return RESPONSES.UNAUTHORIZED
  }

  const isPlayerExist = await prisma.player.findFirst({
    where: {
      name: nickname,
    },
  })
  console.log(isPlayerExist)
  return NextResponse.json({ status: 'success', canBeCreated: !isPlayerExist }, { status: 200 })
}
