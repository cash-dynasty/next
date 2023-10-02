import { NextResponse } from 'next/server'
import { prisma } from '@/utils/db'
import { ConfirmationToken } from '@prisma/client'
import dayjs from 'dayjs'

export async function POST(request: Request) {
  const { confirmationToken, email } = await request.json()

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
    include: {
      confirmationTokenList: {
        where: {
          isUsed: false,
          token: confirmationToken,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  console.log(user)

  if (!user) {
    return NextResponse.json(
      {
        status: 'fail',
        message: 'user_not_found',
      },
      { status: 409 },
    )
  }

  if (user.isConfirmed) {
    return NextResponse.json(
      {
        status: 'fail',
        message: 'user_already_confirmed',
      },
      { status: 409 },
    )
  }

  const tokensList: ConfirmationToken[] = user.confirmationTokenList

  if (!user.confirmationTokenList.length || tokensList[0].token !== confirmationToken) {
    return NextResponse.json(
      {
        status: 'fail',
        message: 'token_not_found',
      },
      { status: 409 },
    )
  }

  if (dayjs().isAfter(tokensList[0].validFor)) {
    return NextResponse.json(
      {
        status: 'fail',
        message: 'token_expired',
      },
      { status: 409 },
    )
  }

  await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      isConfirmed: true,
      confirmationTokenList: {
        updateMany: {
          where: {
            token: confirmationToken,
          },
          data: {
            isUsed: true,
            usedAt: new Date(),
          },
        },
      },
    },
  })

  prisma.$disconnect()

  return NextResponse.json({ status: 'success', message: 'account_activated' }, { status: 200 })
}
