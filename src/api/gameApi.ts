import { api } from './api'
import { TProperty } from '@/types/property'

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

//getProperty
export type GetPropertyApiResponse = {
  status: number
  property: TProperty
}
export type GetPropertyApiArg = {
  propertyId: string
}

export const gameApi = injectedRtkApi

export const { useGameStartMutation, useLazyGetPropertyQuery } = injectedRtkApi
