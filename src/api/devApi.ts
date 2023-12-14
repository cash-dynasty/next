import { api } from './api'
import {
  TCBuilding,
  TCBuildingUpgradeRequirementInsert,
  TCBuildingUpgradeRequirementSelect,
} from '@/db/schema'

const injectedRtkApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBuildingsConfig: builder.query<GetBuildingsConfigApiResponse, GetBuildingsConfigApiArg>({
      query: () => ({
        url: `/dev/buildings`,
      }),
    }),
    createBuildingConfig: builder.mutation<
      CreateBuildingConfigApiResponse,
      CreateBuildingConfigApiArg
    >({
      query: (arg) => ({
        url: `/dev/buildings/create/building`,
        method: 'POST',
        body: {
          description: arg.description,
          maxLevel: arg.maxLevel,
          name: arg.name,
          sector: arg.sector,
          codeName: arg.codeName,
        },
      }),
    }),
    createBuildingRequirementConfig: builder.mutation<
      CreateBuildingRequirementConfigApiResponse,
      CreateBuildingRequirementConfigApiArg
    >({
      query: (arg) => ({
        url: `/dev/buildings/create/requirementLevel`,
        method: 'POST',
        body: {
          buildingId: arg.buildingId,
          level: arg.level,
          upgradePrice: arg.upgradePrice,
        },
      }),
    }),
    updateBuildingConfig: builder.mutation<
      UpdateBuildingConfigApiResponse,
      UpdateBuildingConfigApiArg
    >({
      query: (arg) => ({
        url: `/dev/buildings/update/building`,
        method: 'PUT',
        body: {
          description: arg.description,
          maxLevel: arg.maxLevel,
          name: arg.name,
          sector: arg.sector,
          id: arg.id,
        },
      }),
    }),
    updateRequiredBuildingConfig: builder.mutation({
      query: (arg) => ({
        url: `/config/building/requiredBuilding`,
        method: 'PUT',
        body: {
          buildingId: arg.buildingId,
          requirementId: arg.requirementId,
        },
      }),
    }),
    updateBuildingUpgradePriceConfig: builder.mutation({
      query: (arg) => ({
        url: `/config/building/upgradePrice/update`,
        method: 'PUT',
        body: {
          buildingUpgradeRequirementId: arg.buildingUpgradeRequirementId,
          upgradePrice: arg.upgradePrice,
        },
      }),
    }),
  }),
})

// getBuildingsConfig
export type GetBuildingsConfigApiResponse = {
  status: number
  buildings: TCBuilding[]
}
export type GetBuildingsConfigApiArg = void

// createBuildingConfig
export type CreateBuildingConfigApiResponse = {
  status: number
  building: TCBuilding
}
export type CreateBuildingConfigApiArg = Partial<TCBuilding>

// createBuildingConfig
export type CreateBuildingRequirementConfigApiResponse = {
  status: number
  requirement: TCBuildingUpgradeRequirementSelect
}
export type CreateBuildingRequirementConfigApiArg = TCBuildingUpgradeRequirementInsert

// updateBuildingConfig
export type UpdateBuildingConfigApiResponse = {
  status: number
  building: TCBuilding[]
}
export type UpdateBuildingConfigApiArg = Partial<TCBuilding>

export const devApi = injectedRtkApi

export const {
  useGetBuildingsConfigQuery,
  useCreateBuildingConfigMutation,
  useUpdateBuildingConfigMutation,
  useCreateBuildingRequirementConfigMutation,
  useUpdateRequiredBuildingConfigMutation,
  useUpdateBuildingUpgradePriceConfigMutation,
} = injectedRtkApi
