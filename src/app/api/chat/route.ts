import { NextResponse } from 'next/server'
import { prisma } from '@/utils/db'

export async function POST(request: Request) {
  const { message } = await request.json()

  await prisma.testMsg.create({
    data: {
      msg: message,
    },
  })

  return NextResponse.json({ status: 'success' }, { status: 200 })
}

export async function GET() {
  const messages = await prisma.testMsg.findMany({
    orderBy: {
      createdAt: 'asc',
    },
  })

  console.log(messages)

  return NextResponse.json({ status: 'success', data: messages }, { status: 200 })
}
