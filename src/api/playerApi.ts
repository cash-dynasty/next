import { api } from './api'
import { Player } from '@prisma/client'

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
  playerData: Partial<Player>
}
export type GetPlayerInfoApiArg = void

export const playerApi = injectedRtkApi

export const { useGetPlayerInfoQuery } = injectedRtkApi
