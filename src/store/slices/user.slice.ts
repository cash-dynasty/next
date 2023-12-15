import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/store/store'

import { TUserSelect } from '@/db/schema'

export type SetUserPayload = {
  user: TUserSelect
}

export type TUserState = {
  user: TUserSelect | null
}

const initialState: TUserState = {
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

const getUser = (state: RootState) => state.user

export const selectors = {
  selectUserData: createSelector(getUser, (user) => user),
}
export const { setUser } = userSlice.actions

export default userSlice.reducer
