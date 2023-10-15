import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const usersList = await prisma.user.findMany()

  return NextResponse.json({ status: 'success', usersList }, { status: 200 })
}
