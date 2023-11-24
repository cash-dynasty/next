import { NextResponse } from 'next/server'
import { dbDev } from '@/db_dev'
import { cBuilding, cBuildingUpgradeRequirement } from '@/db_dev/schema'

export async function POST() {
  const cBuild = await dbDev
    .insert(cBuilding)
    .values({
      sector: 'MEDIC',
      name: 'medic_hq',
      maxLevel: 20,
      description: 'siedziba główna',
    })
    .returning()

  const buildings = []

  for (let i = 0; i < cBuild[0].maxLevel; i++) {
    buildings.push({
      level: i + 1,
      upgradePrice: 100,
      buildingId: cBuild[0].id,
    })
  }

  await dbDev.insert(cBuildingUpgradeRequirement).values(buildings).execute()

  const response = await dbDev.query.cBuilding.findMany({
    with: {
      buildingUpgradeRequirement: true,
    },
  })

  return NextResponse.json({ status: 'success', data: response }, { status: 200 })
}
