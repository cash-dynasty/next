import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { prisma } from '@/utils/db'

export async function POST(request: Request) {
  const { username, password, email } = await request.json()
  console.log('1', username, password, email)
  console.time('hash')
  const passwordHash = await bcrypt.hash(password, 5)
  console.timeEnd('hash')
  console.log('2')
  const data = await prisma.user.create({
    data: { nickname: username, password: passwordHash, email },
  })
  console.log('data::::', data)
  return NextResponse.json({ status: 'ok' })
}
