// import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

export async function GET() {
  // const usersList = await prisma.user.findMany({
  //   select: {
  //     lastSeen: true,
  //     username: true,
  //     id: true,
  //     email: true,
  //   },
  // })

  return NextResponse.json({ status: 'success', usersList: 'usersList' }, { status: 200 })
}
