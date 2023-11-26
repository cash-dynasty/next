import { NextResponse } from 'next/server'
import { dbDev } from '@/db_dev'
import { confirmationToken, player, user } from '@/db_dev/schema'
import { eq } from 'drizzle-orm'

export async function POST() {
  const userQuery = await dbDev
    .insert(user)
    .values({
      email: 'mwm2',
      password: 'mwm2',
    })
    .returning()

  await dbDev
    .insert(player)
    .values({
      nickname: 'wicherixen2',
      userId: userQuery[0].id,
    })
    .execute()

  await dbDev
    .insert(confirmationToken)
    .values({
      userId: userQuery[0].id,
      token: 'token',
      validFor: '2023-11-25T19:36:38.237Z',
    })
    .execute()

  const response = await dbDev.query.user.findMany({
    where: eq(user.id, userQuery[0].id),
    with: {
      player: true,
      confirmationToken: true,
    },
  })

  return NextResponse.json({ status: 'success', data: response }, { status: 200 })
}
