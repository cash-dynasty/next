import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/utils/db'
import { getToken } from 'next-auth/jwt'
import { RRESPONSES, secureEndpoint } from '@/utils/backend'

export async function POST(req: NextRequest) {
  if (await secureEndpoint(req)) {
    return RRESPONSES.UNAUTHORIZED
  }

  const { message, fromId, conversation } = await req.json()

  const newMessage = await prisma.message.create({
    data: {
      message: message,
      fromId: fromId,
      conversationId: conversation,
    },
    include: {
      from: { select: { username: true } },
    },
  })

  return NextResponse.json({ status: 'success', data: newMessage }, { status: 200 })
}

export async function GET(req: NextRequest) {
  const token = await getToken({ req })

  if (!token) {
    return NextResponse.json({ status: 'fail', data: 'unauthorized' }, { status: 401 })
  }

  const messages = await prisma.message.findMany({
    orderBy: {
      createdAt: 'asc',
    },
    include: {
      from: { select: { username: true } },
    },
  })

  return NextResponse.json({ status: 'success', data: messages }, { status: 200 })
}
