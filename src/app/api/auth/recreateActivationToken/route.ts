import { prisma } from '@/utils/db'
import dayjs from 'dayjs'
import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { store } from '@/store/store'
import { commonApi } from '@/api'
import { validateRecaptcha } from '@/utils/api'

export async function POST(request: Request) {
  const { token, email, gReCaptchaToken } = await request.json()
  const headers = request.headers

  NextResponse.next({
    headers,
  })

  await validateRecaptcha(gReCaptchaToken)

  const oldToken = await prisma.confirmationToken.findFirst({
    where: {
      token: token,
    },
    include: {
      owner: true,
    },
  })

  if (!oldToken || oldToken.owner.email !== email) {
    return NextResponse.json(
      {
        status: 'fail',
        message: 'token_not_found',
      },
      { status: 409 },
    )
  }

  if (dayjs().isAfter(oldToken.validFor)) {
    await prisma.confirmationToken.update({
      where: {
        id: oldToken.id,
      },
      data: {
        validFor: dayjs().toDate(),
      },
    })
  }

  const newToken = crypto.randomBytes(64).toString('hex')

  const createdToken = await prisma.confirmationToken.create({
    data: {
      ownerId: oldToken.ownerId,
      token: newToken,
      validFor: dayjs().add(24, 'hour').toDate(),
    },
  })

  if (createdToken) {
    await store
      .dispatch(
        commonApi.endpoints?.sendConfirmationMail.initiate({
          mailTo: email,
          confirmationToken: createdToken.token,
          validFor: createdToken.validFor,
          username: oldToken.owner.username,
        }),
      )
      .then((res) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (res.data.status === 'success') {
          return NextResponse.json({ status: 'success', message: 'token_created' }, { status: 200 })
        }
      })
  }
}
