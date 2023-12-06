import { NextResponse } from 'next/server'
import * as bcrypt from 'bcrypt'
import axios from 'axios'
import crypto from 'crypto'
import dayjs from 'dayjs'
import { commonApi } from '@/api'
import { store } from '@/store/store'
import { db } from '@/db'
import { confirmationToken, user } from '@/db/schema'

const secretKey = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY

export async function POST(request: Request) {
  const { password, email, gReCaptchaToken } = await request.json()
  const passwordHash = await bcrypt.hash(password, 10)

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
            message: 'Captcha verification failed',
          },
          { status: 409 },
        )
      }
    })
    .catch((err) => {
      return NextResponse.json({ status: 'fail', message: err }, { status: 400 })
    })

  try {
    const createdUser = await db
      .insert(user)
      .values({
        email,
        password: passwordHash,
      })
      .returning()

    const createdToken = await db
      .insert(confirmationToken)
      .values({
        token: generateToken,
        userId: createdUser[0].id,
        validFor: dayjs().add(24, 'hour').toString(),
      })
      .returning()

    await store().dispatch(
      commonApi.endpoints.sendConfirmationMail.initiate({
        confirmationToken: createdToken[0].token,
        mailTo: createdUser[0].email,
        validFor: createdToken[0].validFor,
      }),
    )
  } catch (error) {
    if (error) {
      return NextResponse.json({ status: 'fail', message: error }, { status: 409 })
    }
  }

  return NextResponse.json({ status: 'success', message: 'Account created' }, { status: 200 })
}
