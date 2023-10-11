import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'
import { getSession } from 'next-auth/react'

export async function GET(request: Request) {
  const headers = request.headers
  const session = getSession()
  console.log(session)

  const playerData = await prisma.player.findMany()
  return NextResponse.json({ status: 200, body: playerData }, { status: 200 })
}
