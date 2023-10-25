import { api } from './api'
import { Player } from '@prisma/client'

const injectedRtkApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPlayerInfo: builder.query<GetPlayerInfoApiResponse, GetPlayerInfoApiArg>({
      query: () => ({
        url: `/player`,
      }),
    }),
    getPlayerAlreadyExist: builder.query<
      GetPlayerAlreadyExistApiResponse,
      GetPlayerAlreadyExistApiArg
    >({
      query: (queryArg) => ({
        url: `/player/checkAlreadyExist/${queryArg.nickname}`,
      }),
    }),
  }),
})

// getPlayerInfo
export type GetPlayerInfoApiResponse = {
  status: number
  playerData: Partial<Player>
}
export type GetPlayerInfoApiArg = void

// getPlayerAlreadyExist
export type GetPlayerAlreadyExistApiResponse = {
  status: number
  canBeCreated: boolean
}
export type GetPlayerAlreadyExistApiArg = { nickname: Player['name'] }

export const playerApi = injectedRtkApi

export const { useGetPlayerInfoQuery, useLazyGetPlayerAlreadyExistQuery } = injectedRtkApi
