import { NextResponse } from 'next/server'
import * as bcrypt from 'bcrypt'
import { Prisma } from '@prisma/client'
import axios from 'axios'
import { prisma } from '@/utils/db'
import crypto from 'crypto'
import dayjs from 'dayjs'
import { commonApi } from '@/api'
import { store } from '@/store/store'

export async function POST(request: Request) {
  const { username, password, email, gReCaptchaToken } = await request.json()
  const secretKey = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY
  const passwordHash = await bcrypt.hash(password, 10)

  let createdUser = null
  let createdToken = null

  const generateToken = crypto.randomBytes(64).toString('hex')

  await axios
    .post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${gReCaptchaToken}`,
    )
    .then((res) => {
      if (!res.data.success || res.data.score < 0.5) {
        return NextResponse.json(
          {
            status: 'fail',
            error: 'Captcha verification failed',
          },
          { status: 409 },
        )
      }
    })
    .catch((err) => {
      return NextResponse.json({ status: 'fail', error: err }, { status: 400 })
    })

  try {
    createdUser = await prisma.user.create({
      data: { username, password: passwordHash, email },
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ status: 'fail', error: error.code }, { status: 409 })
    }
  }

  try {
    if (createdUser) {
      createdToken = await prisma.confirmationToken.create({
        data: {
          ownerId: createdUser?.id,
          token: generateToken,
          validFor: dayjs().add(24, 'hour').toDate(),
        },
      })
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ status: 'fail', error: error.code }, { status: 409 })
    }
  }

  if (createdToken && createdUser) {
    await store.dispatch(
      commonApi.endpoints.sendConfirmationMail.initiate({
        confirmationToken: createdToken.token,
        mailTo: createdUser.email,
        username: createdUser.username,
        validFor: createdToken.validFor,
      }),
    )
  }

  return NextResponse.json({ status: 'ok', message: 'Account created' }, { status: 200 })
}
