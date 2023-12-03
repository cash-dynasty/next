import { api } from './api'
import { TBuildingsSelect } from '@/db/schema'

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

export const gameApi = injectedRtkApi

export const { useGameStartMutation, useGetBuildingsQuery } = injectedRtkApi
