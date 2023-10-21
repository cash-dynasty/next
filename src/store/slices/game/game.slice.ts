import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/store/store'
import { GameState, SetSelectedPropertyPayload } from './game.slice.types'

const initialState: GameState = {
  selectedProperty: null,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setSelectedProperty(state, { payload }: PayloadAction<SetSelectedPropertyPayload>) {
      state.selectedProperty = payload.propertyId
    },
  },
})

// Action creators are generated for each case reducer function
const getGame = (state: RootState) => state.game
export const selectors = {
  selectSelectedProperty: createSelector(getGame, (game) => game.selectedProperty),
}
export const { setSelectedProperty } = gameSlice.actions

export default gameSlice.reducer
