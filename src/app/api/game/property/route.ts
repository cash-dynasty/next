import { NextRequest, NextResponse } from 'next/server'
import { RESPONSES, secureEndpoint } from '@/utils/backend'

export async function GET(req: NextRequest) {
  if (await secureEndpoint(req)) {
    return RESPONSES.UNAUTHORIZED
  }

  return NextResponse.json({ status: 'success', data: 'data_here' }, { status: 200 })
}
