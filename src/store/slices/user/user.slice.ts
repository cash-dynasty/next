import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { SetUserPayload, UserState } from './user.slice.types'
import { RootState } from '@/store/store'

const initialState: UserState = {
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<SetUserPayload>) {
      state.user = payload.user
    },
  },
})

// Action creators are generated for each case reducer function
const getUser = (state: RootState) => state.user
export const selectors = {
  selectUserData: createSelector(getUser, (user) => user),
}
export const { setUser } = userSlice.actions

export default userSlice.reducer
