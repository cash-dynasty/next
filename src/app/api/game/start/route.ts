import { NextRequest, NextResponse } from 'next/server'
import { RESPONSES, secureEndpoint } from '@/utils/backend'
// import { getToken } from 'next-auth/jwt'
// import { prisma } from '@/utils/db'
// import { Sector } from '@prisma/client'

export async function POST(req: NextRequest) {
  if (await secureEndpoint(req)) {
    return RESPONSES.UNAUTHORIZED
  }

  // const token = await getToken({ req })
  // const { sector, nickname } = await req.json()

  // await prisma.player.create({
  //   data: {
  //     name: nickname,
  //     userId: token?.id,
  //     income: 1000,
  //     properties: {
  //       create: {
  //         sector: sector as Sector,
  //         name: `Pierwsza firma ${nickname}`,
  //         buildings: {
  //           create: MEDIC_BUILDINGS.map((building) => ({
  //             level: building === 'medic_hq' ? 1 : 0,
  //             configBuildingId: building,
  //           })),
  //         },
  //       },
  //     },
  //   },
  // })

  return NextResponse.json({ status: 'success', data: 'Player created' }, { status: 200 })
}
