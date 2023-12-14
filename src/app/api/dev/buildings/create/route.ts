import { NextRequest, NextResponse } from 'next/server'
import { RESPONSES, secureEndpoint } from '@/utils/backend'
import { db } from '@/db'
import {cBuildingUpgradeRequirement, TCBuildingUpgradeRequirementInsert} from '@/db/schema'


export async function POST(req: NextRequest) {
  // if (await secureEndpoint(req)) {
  //   return RESPONSES.UNAUTHORIZED
  // }
const {building} = await req.json()
    console.log('1', building);

    // const building = {
    //     "id": 100012,
    //     "codeName": "krrr",
    //     "name": "krrre",
    //     "description": "1",
    //     "sector": "FINANCE",
    //     "maxLevel": 8,
    //     "buildingUpgradeRequirement": [
    //         {
    //             "level": 1,
    //             "upgradePrice": 100,
    //             "requiredBuilding": [
    //                 {
    //                     "buildingId": 100012,
    //                     "requiredBuildingLevel": 1,
    //                     "buildingUpgradeRequirementId": 100010
    //                 }
    //             ]
    //         },
    //         {
    //             "level": 2,
    //             "upgradePrice": 1000,
    //             "requiredBuilding": [
    //                 {
    //                     "buildingId": 100012,
    //                     "requiredBuildingLevel": 1,
    //                     "buildingUpgradeRequirementId": 100011
    //                 }
    //             ]
    //         },
    //         {
    //             "level": 3,
    //             "upgradePrice": 100000000,
    //             "requiredBuilding": [
    //                 {
    //                     "buildingId": 100012,
    //                     "requiredBuildingLevel": 1,
    //                     "buildingUpgradeRequirementId": 100012
    //                 }
    //             ]
    //         },
    //         {
    //             "level": 4,
    //             "upgradePrice": 0,
    //             "requiredBuilding": []
    //         },
    //         {
    //             "level": 5,
    //             "upgradePrice": 0,
    //             "requiredBuilding": []
    //         },
    //         {
    //             "level": 6,
    //             "upgradePrice": 0,
    //             "requiredBuilding": []
    //         },
    //         {
    //             "level": 7,
    //             "upgradePrice": 0,
    //             "requiredBuilding": []
    //         },
    //         {
    //             "level": 8,
    //             "upgradePrice": 0,
    //             "requiredBuilding": []
    //         },
    //         {
    //             "level": 9,
    //             "upgradePrice": 0,
    //             "requiredBuilding": []
    //         }
    //     ]
    // }

  const buildingUpgradeRequirements: TCBuildingUpgradeRequirementInsert[] = building.buildingUpgradeRequirement.map((el:TCBuildingUpgradeRequirementInsert) => {
      return {
          buildingId: building.id,
          level: el.level,
          upgradePrice: el.upgradePrice

      }
  })

    console.log('2', buildingUpgradeRequirements);


    // const { name, codeName, sector, description, maxLevel } = await req.json()

  const createBuildingUpgradeRequirement = await db
    .insert(cBuildingUpgradeRequirement)
    .values(buildingUpgradeRequirements)
    .returning()

  return NextResponse.json({ status: 'success', createBuildingUpgradeRequirement }, { status: 200 })
}

// mapowanie po createBuildingUpgradeRequirement i dla kazdego elementu szukasz 'find' po lvl z glownego obiektu czyli 'building'

// {
//     "status": "success",
//     "createBuildingUpgradeRequirement": [
//     {
//         "id": 100042,
//         "level": 1,
//         "upgradePrice": 100,
//         "buildingId": 100012
//     },
//     {
//         "id": 100043,
//         "level": 2,
//         "upgradePrice": 1000,
//         "buildingId": 100012
//     },
//     {
//         "id": 100044,
//         "level": 3,
//         "upgradePrice": 100000000,
//         "buildingId": 100012
//     },
//     {
//         "id": 100045,
//         "level": 4,
//         "upgradePrice": 0,
//         "buildingId": 100012
//     },
//     {
//         "id": 100046,
//         "level": 5,
//         "upgradePrice": 0,
//         "buildingId": 100012
//     },
//     {
//         "id": 100047,
//         "level": 6,
//         "upgradePrice": 0,
//         "buildingId": 100012
//     },
//     {
//         "id": 100048,
//         "level": 7,
//         "upgradePrice": 0,
//         "buildingId": 100012
//     },
//     {
//         "id": 100049,
//         "level": 8,
//         "upgradePrice": 0,
//         "buildingId": 100012
//     },
//     {
//         "id": 100050,
//         "level": 9,
//         "upgradePrice": 0,
//         "buildingId": 100012
//     }
// ]
// }

