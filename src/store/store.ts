import { configureStore } from '@reduxjs/toolkit'
import { commonApi } from '@/api'
import gameSlice from './slices/game/game.slice'

export const store = configureStore({
  reducer: {
    [commonApi.reducerPath]: commonApi.reducer,
    game: gameSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(commonApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
