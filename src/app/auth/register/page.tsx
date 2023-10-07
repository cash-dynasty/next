'use client'
import { useRef } from 'react'
import { Button } from '@/components/atoms/Button'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useRegisterAccountMutation } from '@/api'
import { cn } from '@/utils/styles'
import { handleRTKErrors } from '@/utils/api'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextInput } from '@atoms'

type FormData = yup.InferType<typeof schema>

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required()

export default function Register() {
  const formSubmitButtonRef = useRef<HTMLInputElement>(null)

  const [registerAccount, { isLoading, isSuccess, isError, error }] = useRegisterAccountMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  console.log('formState', errors, { ...register('username') })

  const { executeRecaptcha } = useGoogleReCaptcha()

  const handleClickFormSubmit = () => {
    console.log('send', formSubmitButtonRef.current)

    formSubmitButtonRef.current?.click()
  }

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
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col gap-4 bg-slate-800 p-12 w-full max-w-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput leftIcon fullWidth {...register('username')} placeholder="Nazwa użytkownika" />
          <p>{errors.username?.message}</p>

          <TextInput leftIcon fullWidth {...register('password')} placeholder="Hasło" />
          <p>{errors.password?.message}</p>

          <TextInput leftIcon fullWidth {...register('email')} placeholder="Adres email" />
          <p>{errors.email?.message}</p>

          <input type="submit" hidden ref={formSubmitButtonRef} />
          <Button
            label={isLoading ? 'Proszę czekać...' : 'Zarejestruj konto za darmo'}
            onClick={handleClickFormSubmit}
          />
          {/*<button onClick={reset}>reset</button>*/}
          <Button label="reset" onClick={() => reset()} />
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
    </div>
  )
}
