'use client'

import { Button } from '@atoms/Button'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useConfirmAccountRegistrationMutation, useCreateNewActivationTokenMutation } from '@/api'
import { handleRTKErrors } from '@/utils/api'
import { translateActivationResponseError } from '@/app/auth/activate/[token]/[email]/constants'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

type ActivatePageProps = {
  params: {
    email: string
    token: string
  }
}

export default function Activate({ params: { email: emailDirty, token } }: ActivatePageProps) {
  const router = useRouter()
  const { executeRecaptcha } = useGoogleReCaptcha()
  const email = decodeURIComponent(emailDirty)

  const [activateAccount, { isLoading, error, isError }] = useConfirmAccountRegistrationMutation()
  const [recreateToken] = useCreateNewActivationTokenMutation()

  useEffect(() => {
    activateAccount({
      email,
      confirmationToken: token,
    })
  }, [])

  const errorData = handleRTKErrors(error)

  const handleGenerateNewToken = async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available')
      return
    }
    const gReCaptchaToken = await executeRecaptcha('recreateToken')
    console.log('email', email)
    await recreateToken({
      token,
      email,
      gReCaptchaToken,
      reason: 'token_expired',
    })
  }

  if (isError) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="bg-slate-800 flex flex-col p-12 gap-5 min-w-3xl max-w-3xl">
          <h1 className="text-3xl text-white text-center">Aktywacja konta nieudana</h1>
          <p className="text-lg text-gray-400 text-center">Podczas aktywacji konta wystąpił błąd</p>
          <p className="text-center text-white font-bold text-xs w-full p-4 bg-slate-700">
            {translateActivationResponseError(errorData?.message)}
          </p>
          <Button label="Wyślij ponownie link aktywacyjny" onClick={handleGenerateNewToken} />
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="bg-slate-800 flex flex-col p-12 gap-5 min-w-3xl max-w-3xl">
          <h1 className="text-3xl text-white text-center">Aktywacja konta</h1>
          <p className="text-lg text-gray-400 text-center">Trwa aktywacja konta...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex items-center justify-center">
      <div className="bg-slate-800 flex flex-col p-12 gap-5 min-w-3xl max-w-3xl">
        <h1 className="text-3xl text-white text-center">Aktywacja konta pomyślna</h1>
        <p className="text-lg text-gray-400 text-cente r">
          Twoje konto zostało pomyślnie aktywowane, możesz przejść do strony logowania i rozpocząć
          rozgrywkę!
        </p>
        <Button className="mt-8" label={'Zaloguj się'} onClick={() => router.push('/auth/login')} />
      </div>
    </div>
  )
}
