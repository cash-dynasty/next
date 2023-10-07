import { NextResponse } from 'next/server'
import { prisma } from '@/utils/db'

export async function POST(request: Request) {
  const { message, fromId, conversation } = await request.json()

  console.log(message, fromId, conversation)

  const newMessage = await prisma.message.create({
    data: {
      message: message,
      fromId: fromId,
      conversationId: conversation,
    },
  })

  return NextResponse.json({ status: 'success', data: newMessage }, { status: 200 })
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
