import { api } from './api'
import { TPlayerSelect, TPropertySelect } from '@/db/schema'

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
  player: TPlayerSelect & { property: TPropertySelect[] }
}
export type GetPlayerInfoApiArg = void

// getPlayerAlreadyExist
export type GetPlayerAlreadyExistApiResponse = {
  status: number
  nicknameAvailable: boolean
}
export type GetPlayerAlreadyExistApiArg = { nickname: TPlayerSelect['nickname'] }

export const playerApi = injectedRtkApi

export const { useGetPlayerInfoQuery, useLazyGetPlayerAlreadyExistQuery } = injectedRtkApi
