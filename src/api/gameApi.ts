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

export const gameApi = injectedRtkApi

export const { useGameStartMutation } = injectedRtkApi
