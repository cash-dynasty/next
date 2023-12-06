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
    selectedProperty: null,
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
        setSelectedProperty(state, { payload }: PayloadAction<SetSelectedPropertyPayload>) {
      state.selectedProperty = payload.propertyId
    },
  },
})

// Action creators are generated for each case reducer function
const getGame = (state: RootState) => state.game
export const selectors = {
  selectGameStart: createSelector(getGame, (game) => game.gameStart),
  selectSelectedProperty: createSelector(getGame, (game) => game.selectedProperty),
}
export const { setSelectedProperty, setGameStartNickname, setGameStartSector } = gameSlice.actions

export default gameSlice.reducer
