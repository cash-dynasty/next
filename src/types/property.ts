import {
  Config_Building,
  Config_BuildingRequirement,
  Config_RequiredBuilding,
  Property,
} from '@prisma/client'
import { TBuilding } from './building'

export type TPropertyBuilding = {
  buildingId: TBuilding['id']
  level: TBuilding['level']
  building: TBuilding['configBuildingId']
  buildingName?: Config_Building['name']
  maxLevel?: Config_Building['maxLevel']
  upgrade?: {
    price?: Config_BuildingRequirement['upgradePrice']
    requiredBuildings?: Config_RequiredBuilding[]
  }
}

export type TProperty = Partial<Property> & {
  buildings?: TPropertyBuilding[]
}
