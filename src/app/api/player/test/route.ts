import { NextRequest, NextResponse } from 'next/server'
import { RESPONSES, secureEndpoint } from '@/utils/backend'
import { prisma } from '@/utils/db'

export async function GET(req: NextRequest) {
  if (await secureEndpoint(req)) {
    return RESPONSES.UNAUTHORIZED
  }

  const data = await prisma.config_Building.findMany({
    include: {
      requirements: {
        select: {
          upgradePrice: true,
          level: true,
          requiredBuildings: {
            select: {
              buildingId: true,
              buildingLevel: true,
            },
          },
        },
      },
    },
  })

  return NextResponse.json({ status: 'success', data }, { status: 200 })
}
