import { EMoneyTransferOperations, ESector, TBuildingsSelect, TPropertySelect } from '@/db/schema'

import { api } from './api'

const injectedRtkApi = api.injectEndpoints({
  endpoints: (builder) => ({
    gameStart: builder.mutation<GameStartApiResponse, GameStartApiArg>({
      query: (queryArg) => ({
        url: `/game/start`,
        method: 'POST',
        body: {
          nickname: queryArg.nickname,
          sector: queryArg.sector,
        },
      }),
    }),
    getBuildings: builder.query<GetBuildingsApiResponse, GetBuildingsApiArg>({
      query: (queryArg) => ({
        url: `/game/buildings/${queryArg.propertyId}`,
        method: 'GET',
      }),
    }),
    getProperty: builder.query<GetPropertyApiResponse, GetPropertyApiArg>({
      query: (queryArg) => ({
        url: `/game/property/${queryArg.propertyId}`,
      }),
    }),
    createSafeboxTransfer: builder.mutation<
      CreateSafeboxTransferApiResponse,
      CreateSafeboxTransferApiArg
    >({
      query: (queryArg) => ({
        url: `/game/money/safeboxTransfer`,
        method: 'POST',
        body: {
          propertyId: queryArg.propertyId,
          amount: queryArg.amount,
          type: queryArg.type,
        },
      }),
    }),
  }),
})

//gameStart
export type GameStartApiResponse = {
  status: number
  message: string
}
export type GameStartApiArg = {
  sector: ESector
  nickname: string
}

//createSafeboxTransfer
export type CreateSafeboxTransferApiResponse = void
export type CreateSafeboxTransferApiArg = {
  propertyId: number
  amount: number
  type: EMoneyTransferOperations
}

//getBuildings
export type GetBuildingsApiResponse =
  | {
      status: number
      buildings: TBuildingsSelect
      message: never
    }
  | {
      status: number
      buildings: never
      message: string
    }
export type GetBuildingsApiArg = {
  propertyId: number
}

//getProperty
export type GetPropertyApiResponse = {
  status: number
  property: TPropertySelect
}
export type GetPropertyApiArg = {
  propertyId: number
}

export const gameApi = injectedRtkApi

export const {
  useGameStartMutation,
  useGetBuildingsQuery,
  useLazyGetPropertyQuery,
  useCreateSafeboxTransferMutation,
} = injectedRtkApi
