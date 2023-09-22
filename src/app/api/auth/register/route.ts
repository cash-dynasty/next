import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { prisma } from '@/utils/db'
import { Prisma } from '@prisma/client'
import axios from 'axios'

export async function POST(request: Request) {
  const { username, password, email, gReCaptchaToken } = await request.json()
  const secretKey = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY
  const passwordHash = await bcrypt.hash(password, 10)

  await axios
    .post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${gReCaptchaToken}`,
    )
    .then((res) => {
      if (!res.data.success || res.data.score < 0.5) {
        return NextResponse.json(
          { status: 'fail', error: 'Captcha verification failed' },
          { status: 409 },
        )
      }
    })
    .catch((err) => {
      return NextResponse.json({ status: 'fail', error: err }, { status: 400 })
    })

  try {
    await prisma.user.create({
      data: { username, password: passwordHash, email },
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { status: 'fail', error: error.code },
        { status: 409 },
      )
    }
  }
  return NextResponse.json(
    { status: 'ok', message: 'Account created' },
    { status: 200 },
  )
}
