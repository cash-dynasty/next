import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const headers = request.headers

  console.log(headers)

  const playerData = await prisma.player.findMany()
  return NextResponse.json({ status: 200, body: playerData }, { status: 200 })
}
