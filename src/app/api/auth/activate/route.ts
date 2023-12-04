import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { confirmationToken, user } from '@/db/schema'
import { RESPONSES } from '@/utils/backend'

dayjs.extend(utc)

export async function PUT(req: Request) {
  const { confirmationToken: confirmationTokenReq, email } = await req.json()

  const userData = await db.query.user.findFirst({
    where: eq(user.email, email),
  })

  if (!userData) return RESPONSES.AUTH_USER_NOT_FOUND
  if (userData.isActive) return RESPONSES.AUTH_USER_ALREADY_ACTIVE

  const confirmationTokenData = await db.query.confirmationToken.findFirst({
    where: (confirmationToken, { eq }) =>
      eq(confirmationToken.userId, userData.id) &&
      eq(confirmationToken.token, confirmationTokenReq),
  })

  if (!confirmationTokenData || dayjs(confirmationTokenData.validFor).isBefore(dayjs()))
    return RESPONSES.AUTH_TOKEN_INCORRECT_OR_EXPIRED

  await db
    .update(user)
    .set({
      isActive: true,
    })
    .where(eq(user.id, userData.id))

  await db
    .update(confirmationToken)
    .set({
      isUsed: true,
      usedAt: dayjs().format(),
    })
    .where(eq(confirmationToken.id, confirmationTokenData.id))

  return RESPONSES.AUTH_ACCOUNT_ACTIVATED
}
