import { api } from './api'
import { TPlayer } from '@/types/player'

const injectedRtkApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPlayerInfo: builder.query<GetPlayerInfoApiResponse, GetPlayerInfoApiArg>({
      query: () => ({
        url: `/player`,
      }),
    }),
  }),
})

// GetPlayerInfo
export type GetPlayerInfoApiResponse = {
  status: number
  playerData: TPlayer
}
export type GetPlayerInfoApiArg = void

export const playerApi = injectedRtkApi

export const { useGetPlayerInfoQuery } = injectedRtkApi
