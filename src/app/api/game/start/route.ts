import { NextRequest, NextResponse } from 'next/server'
import { RRESPONSES, secureEndpoint } from '@/utils/backend'
import { getToken } from 'next-auth/jwt'
import { prisma } from '@/utils/db'
import { Sector } from '@prisma/client'

const MEDIC_BUILDINGS = ['medic_hq', 'medic_waitroom', 'medic_registration', 'medic_office']

export async function POST(req: NextRequest) {
  if (await secureEndpoint(req)) {
    return RRESPONSES.UNAUTHORIZED
  }

  const token = await getToken({ req })
  const { sector, nickname } = await req.json()
  console.log('token', token, token?.id, sector, nickname)

  const data = await prisma.player.create({
    data: {
      name: nickname,
      userId: token?.userId as string,
      income: 1000,
      properties: {
        create: {
          sector: sector as Sector,
          name: `Pierwsza firma ${nickname}`,
          buildings: {
            create: MEDIC_BUILDINGS.map((building) => ({
              level: building === 'medic_hq' ? 1 : 0,
              configBuildingId: building,
            })),
          },
        },
      },
    },
  })

  console.log(data)

  return NextResponse.json({ status: 'success', data: 'Player created' }, { status: 200 })
}
