import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export const secureEndpoint = async (req: NextRequest) => {
  const wsToken = req.headers.get('wsToken')
  const token = await getToken({ req })

  return !token && wsToken !== process.env.WS_AUTH_TOKEN
}

export const RESPONSES = {
  UNAUTHORIZED: NextResponse.json({ status: 'fail', data: 'unauthorized' }, { status: 401 }),
  POST_SUCCESS: NextResponse.json({ status: 'success' }, { status: 200 }),
  AUTH_USER_NOT_FOUND: NextResponse.json(
    { status: 'fail', message: 'User not found' },
    { status: 409 },
  ),
  AUTH_TOKEN_INCORRECT_OR_EXPIRED: NextResponse.json(
    { status: 'fail', message: 'Confirmation token invalid or expired' },
    { status: 409 },
  ),
  AUTH_USER_ALREADY_ACTIVE: NextResponse.json(
    { status: 'fail', message: 'User already activated' },
    { status: 409 },
  ),
  AUTH_ACCOUNT_ACTIVATED: NextResponse.json(
    { status: 'success', message: 'Account activated' },
    { status: 200 },
  ),
}
