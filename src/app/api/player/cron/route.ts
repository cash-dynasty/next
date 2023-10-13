import { NextRequest, NextResponse } from 'next/server'
import schedule from 'node-schedule'
import dayjs from 'dayjs'
import { prisma } from '@/utils/db'

export async function POST(req: NextRequest) {
  const { id } = await req.json()

  const date = dayjs().add(15, 'second').toString()

  schedule.scheduleJob(`testJob${id}`, date, async () => {
    await prisma.player.update({
      where: {
        userId: '3757812b-c3ea-4985-b7e9-9ba660c78f19',
      },
      data: {
        points: {
          increment: 25,
        },
      },
    })
    console.log('incremented')
  })

  return NextResponse.json({ status: 'success', data: 'ok' }, { status: 200 })
}
