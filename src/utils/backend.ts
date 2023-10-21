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
}
