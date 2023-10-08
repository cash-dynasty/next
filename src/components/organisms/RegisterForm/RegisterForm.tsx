'use client'

import { Button, TextInput } from '@atoms'
import { cn } from '@/utils/styles'
import * as yup from 'yup'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRegisterAccountMutation } from '@/api'
import { handleRTKErrors } from '@/utils/api'

type FormData = yup.InferType<typeof schema>

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required()

export const RegisterForm = () => {
  const [registerAccount, { isLoading, isSuccess, isError, error }] = useRegisterAccountMutation()

  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const { executeRecaptcha } = useGoogleReCaptcha()

  const onSubmit = async (data: FormData) => {
    console.log('onSubmit', data)
    const { username, password, email } = data
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
    <div className="w-full bg-slate-800 p-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 items-center">
          <TextInput leftIcon fullWidth {...register('username')} placeholder="Nazwa użytkownika" />
          {/*<p>{errors.username?.message}</p>*/}
          <TextInput leftIcon fullWidth {...register('password')} placeholder="Hasło" />
          {/*<p>{errors.password?.message}</p>*/}
          <TextInput leftIcon fullWidth {...register('email')} placeholder="Adres email" />
          {/*<p>{errors.email?.message}</p>*/}
          <Button
            fullWidth
            label={isLoading ? 'Proszę czekać...' : 'Zarejestruj konto za darmo'}
            type="submit"
          />
          <Button label="reset" onClick={() => reset()} fullWidth />
        </div>
      </form>
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
    </div>
  )
}
