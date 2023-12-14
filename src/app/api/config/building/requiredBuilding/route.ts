import { NextRequest, NextResponse } from 'next/server'
import { RESPONSES, secureEndpoint } from '@/utils/backend'
import { db } from '@/db'
import { cRequiredBuilding } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function PUT(req: NextRequest) {


    if (await secureEndpoint(req)) {
        return RESPONSES.UNAUTHORIZED
    }

    const { buildingId, requirementId} = await req.json()
console.log(buildingId, requirementId)
    const updateBuilding = await db
        .update(cRequiredBuilding)
        .set({
           buildingId
        })
        .where(eq(cRequiredBuilding.id, requirementId))
        .returning()

    return NextResponse.json({ status: 'success', building: updateBuilding }, { status: 200 })
}
