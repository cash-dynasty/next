import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { prisma } from '@/utils/db'

export async function GET(req: NextRequest) {
  const token = await getToken({ req })

  if (!token) {
    return NextResponse.json({ status: 'fail', data: 'unauthorized' }, { status: 401 })
  }

  const playerData = await prisma.player.findUnique({
    where: {
      userId: token.id,
    },
  })

  if (!playerData) {
    return NextResponse.json({ status: 'fail', data: 'player not found' }, { status: 409 })
  }

  return NextResponse.json({ status: 'success', playerData }, { status: 200 })
}
