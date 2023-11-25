'use client'

import React, { useState } from 'react'
import { LoginForm, RegisterForm } from './parts'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

export const AuthContainer = () => {
  const [state, setState] = useState<'login' | 'registration'>('login')
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'body',
        nonce: undefined,
      }}
    >
      {/*<div className="flex justify-center h-screen bg-slate-700">{children}</div>*/}
      <div className="flex flex-col gap-4 w-full max-w-xl p-2 lg:p-0 lg:ml-20">
        {state === 'login' ? (
          <LoginForm onClick={() => setState('registration')} />
        ) : (
          <RegisterForm onClick={() => setState('login')} />
        )}
      </div>
    </GoogleReCaptchaProvider>
  )
}
