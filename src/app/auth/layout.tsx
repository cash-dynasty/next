'use client'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import React from 'react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
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
      <div className="flex justify-center h-screen bg-slate-700">{children}</div>
    </GoogleReCaptchaProvider>
  )
}
