import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/utils/db'
import { calculateIncomePerSecond } from '@/utils/game'
import dayjs from 'dayjs'
import { RRESPONSES, secureEndpoint } from '@/utils/backend'
import { getToken } from 'next-auth/jwt'

export async function PUT(req: NextRequest) {
  const token = await getToken({ req })
  if (await secureEndpoint(req)) {
    return RRESPONSES.UNAUTHORIZED
  }

  const currentBalance = await prisma.player.findUnique({
    where: {
      userId: token?.id,
    },
    select: {
      moneyBalance: true,
      income: true,
      lastBalanceUpdate: true,
    },
  })

  if (!currentBalance) {
    return NextResponse.json({ status: 'fail', data: 'player not found' }, { status: 409 })
  }

  const incomePerSecond = calculateIncomePerSecond(currentBalance.income)
  const newBalance =
    dayjs().diff(dayjs(currentBalance.lastBalanceUpdate), 'second') * incomePerSecond

  await prisma.player
    .update({
      where: {
        userId: token?.id,
      },
      data: {
        moneyBalance: currentBalance.moneyBalance + newBalance,
        lastBalanceUpdate: dayjs().toDate(),
        income: currentBalance.income + 20,
      },
    })
    .then((res) => {
      console.log('updated', res)
    })

  return NextResponse.json({ status: 'success', data: 'data_here' }, { status: 200 })
}
