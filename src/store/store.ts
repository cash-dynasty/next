import { configureStore, Middleware } from '@reduxjs/toolkit'
import { rootMiddlewares, rootReducer } from '@/store/store.config'

export const store = (customMiddlewares: Middleware[] = []) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([...rootMiddlewares, ...customMiddlewares]),
  })

type storeType = ReturnType<typeof store>
export type RootState = ReturnType<storeType['getState']>
export type AppDispatch = ReturnType<storeType['dispatch']>
