import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { prisma } from '@/utils/db'
import { Prisma } from '@prisma/client'

export async function POST(request: Request) {
  const { username, password, email } = await request.json()
  const passwordHash = await bcrypt.hash(password, 10)
  console.log(username, password, email)
  try {
    await prisma.user.create({
      data: { username, password: passwordHash, email },
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.code, error.message)
      return NextResponse.json(
        { status: 'fail', error: error.code },
        { status: 409 },
      )
    }
  }
  return NextResponse.json({ status: 'ok' })
}
