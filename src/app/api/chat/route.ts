import { NextResponse } from 'next/server'
import { prisma } from '@/utils/db'

export async function POST(request: Request) {
  const { message, userId, conversation } = await request.json()

  console.log(message, userId, conversation)

  await prisma.message.create({
    data: {
      content: message,
      fromId: userId,
      conversationId: conversation,
    },
  })

  return NextResponse.json({ status: 'success' }, { status: 200 })
}

export async function GET() {
  const messages = await prisma.message.findMany({
    orderBy: {
      createdAt: 'asc',
    },
  })

  console.log(messages)

  return NextResponse.json({ status: 'success', data: messages }, { status: 200 })
}
