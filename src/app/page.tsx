'use client'

import { LoginForm, RegisterForm } from '@organisms'
import { useState } from 'react'

export default function Home() {
  const [state, setState] = useState<'login' | 'registration'>('login')
  console.log('test')
  return (
    <div className="w-full min-h-screen flex justify-center lg:justify-start items-center">
      <div
        className="bg-no-repeat bg-center bg-cover w-full min-h-screen absolute top-0 left-0 z-0"
        style={{ backgroundImage: 'url(/city.png)' }}
      />
      <div className="flex flex-col gap-4 w-full max-w-xl p-2 lg:p-0 lg:ml-20">
        {state === 'login' ? (
          <LoginForm onClick={() => setState('registration')} />
        ) : (
          <RegisterForm onClick={() => setState('login')} />
        )}
      </div>
    </div>
  )
}
