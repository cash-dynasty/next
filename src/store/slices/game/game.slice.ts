import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import {
  GameState,
  SetGameStartNicknamePayload,
  SetGameStartSectorPayload,
} from './game.slice.types'
import { RootState } from '@/store/store'

const initialState: GameState = {
  gameStart: {
    nickname: '',
    sector: null,
  },
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameStartNickname(state, { payload }: PayloadAction<SetGameStartNicknamePayload>) {
      state.gameStart.nickname = payload
    },
    setGameStartSector(state, { payload }: PayloadAction<SetGameStartSectorPayload>) {
      state.gameStart.sector = payload
    },
  },
})

// Action creators are generated for each case reducer function
const getGame = (state: RootState) => state.game
export const selectors = {
  selectGameStart: createSelector(getGame, (game) => game.gameStart),
}
export const { setGameStartNickname, setGameStartSector } = gameSlice.actions

export default gameSlice
