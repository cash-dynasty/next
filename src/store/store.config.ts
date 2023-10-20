import { combineReducers, ThunkMiddleware } from '@reduxjs/toolkit'
import { commonApi, gameApi, playerApi, userApi } from '@/api'
import { userSlice } from './slices/user/user.slice'

export const rootReducer = combineReducers({
  [commonApi.reducerPath]: commonApi.reducer,
  [gameApi.reducerPath]: gameApi.reducer,
  [playerApi.reducerPath]: playerApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  user: userSlice.reducer,
})

export const rootMiddlewares = [commonApi.middleware] as ThunkMiddleware[]
