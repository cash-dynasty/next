'use client'

import { store } from '@/store/store'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { Provider } from 'react-redux'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

type Props = {
  children?: React.ReactNode
}

export const Providers = ({ children }: Props) => {
  // console.log('env1', process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY)
  return (
    <SessionProvider>
      <Provider store={store}>
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}
          scriptProps={{
            async: false,
            defer: false,
            appendTo: 'body',
            nonce: undefined,
          }}
        >
          {children}
        </GoogleReCaptchaProvider>
      </Provider>
    </SessionProvider>
  )
}
