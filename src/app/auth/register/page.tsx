'use client'
import { TextInput } from '@/components/atoms/TextInput'
import { useState } from 'react'
import { Button } from '@/components/atoms/Button'
import { normalizeText } from '@/utils/textFormatters'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useRegisterAccountMutation } from '@/api'
import { cn } from '@/utils/styles'
import { handleRTKErrors } from '@/utils/api'

export default function Register() {
  const [username, setUsernane] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [registerAccount, { isLoading, isSuccess, isError, error, reset }] =
    useRegisterAccountMutation()

  console.log(isLoading, isSuccess, isError, error)

  const { executeRecaptcha } = useGoogleReCaptcha()

  const register = async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available')
      return
    }
    const gReCaptchaToken = await executeRecaptcha('register')
    await registerAccount({
      username,
      password,
      email,
      gReCaptchaToken,
    })
  }

  const errorData = handleRTKErrors(error)

  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col gap-4 bg-slate-800 p-12 w-full max-w-xl">
        <TextInput
          leftIcon
          fullWidth
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsernane(normalizeText(e.target.value))}
        />
        <TextInput
          fullWidth
          leftIcon
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(normalizeText(e.target.value))}
        />
        <TextInput
          fullWidth
          leftIcon
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(normalizeText(e.target.value))}
        />
        <Button
          label={isLoading ? 'Proszę czekać...' : 'Zarejestruj konto za darmo'}
          onClick={register}
        />
        {isSuccess && (
          <p className={cn('p-4 bg-green-600 mt-2 w-full text-center text-white')}>
            Konto zarejestrowane pomyślnie! Możesz się zalogować
          </p>
        )}
        {isError && (
          <p className={cn('p-4 bg-red-600 mt-2 w-full text-center text-white')}>
            Wystąpił błąd podczas rejestracji: {errorData}
          </p>
        )}
        <Button label="reset" onClick={reset} />
      </div>
    </div>
  )
}
