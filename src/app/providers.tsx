'use client'

import { store } from '@/store/store'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { Provider } from 'react-redux'

type Props = {
  children?: React.ReactNode
}

export const NextAuthProvider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  )
}
