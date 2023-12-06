import { api } from './api'
import { TBuildingsSelect, TPropertySelect } from '@/db/schema'

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
  }),
})

//gameStart
export type GameStartApiResponse = {
  status: number
  message: string
}
export type GameStartApiArg = {
  sector: string
  nickname: string
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

export const { useGameStartMutation, useGetBuildingsQuery, useLazyGetPropertyQuery } =
  injectedRtkApi
