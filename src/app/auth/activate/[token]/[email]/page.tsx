'use client'

import { Button } from '@atoms/Button'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

type ActivatePageProps = {
  params: {
    email: string
    token: string
  }
}

export default function Activate({ params: { email, token } }: ActivatePageProps) {
  const router = useRouter()

  console.log('token:', token, 'email:', decodeURIComponent(email))

  useEffect(() => {
    //add logic to send request to backend to activate account
  }, [])

  return (
    <div className="h-full flex items-center justify-center">
      <div className="bg-slate-800 flex flex-col p-12 gap-5 max-w-3xl">
        <h1 className="text-3xl text-white text-center">Aktywacja konta pomyślna</h1>
        <p className="text-lg text-gray-400 text-center">
          Twoje konto zostało pomyślnie aktywowane, możesz przejść do strony logowania i rozpocząć
          rozgrywkę!
        </p>
        <Button className="mt-8" label={'Zaloguj się'} onClick={() => router.push('/auth/login')} />
      </div>
    </div>
  )
}
