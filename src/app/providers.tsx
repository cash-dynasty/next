'use client'

import { store as setupStore } from '@/store/store'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { Provider } from 'react-redux'

type Props = {
  children?: React.ReactNode
}

export const Providers = ({ children }: Props) => {
  const store = setupStore()

  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  )
}
