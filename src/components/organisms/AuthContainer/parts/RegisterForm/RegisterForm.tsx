'use client'

import { Button, TextInput } from '@atoms'
import { cn } from '@/utils/styles'
import * as yup from 'yup'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRegisterAccountMutation } from '@/api'
import { handleRTKErrors } from '@/utils/api'
import Image from 'next/image'
import Logo from '@/images/logo.svg'
import { IoLogoGoogle } from 'react-icons/io5'
import { CgFacebook } from 'react-icons/cg'
import Link from 'next/link'

type FormData = yup.InferType<typeof schema>

const schema = yup
  .object({
    password: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required()

type RegisterFormProps = {
  onClick?: () => void
}

export const RegisterForm = ({ onClick }: RegisterFormProps) => {
  const [registerAccount, { isLoading, isSuccess, isError, error }] = useRegisterAccountMutation()

  const { register, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const { executeRecaptcha } = useGoogleReCaptcha()

  const onSubmit = async (data: FormData) => {
    const { password, email } = data
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available')
      return
    }
    const gReCaptchaToken = await executeRecaptcha('register')
    await registerAccount({
      password,
      email,
      gReCaptchaToken,
    })
  }

  const errorData = handleRTKErrors(error)

  return (
    <div className="w-full backdrop-blur-md bg-[#08152D]/80 py-10 lg:py-16 px-10 lg:px-20 font-saira rounded">
      <Image src={Logo} alt="Cash Dynasty logo" className="pb-20" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6 items-center">
          <TextInput
            leftIcon="e-mail"
            fullWidth
            placeholder="Adres email"
            label="Adres email"
            {...register('email')}
          />
          <TextInput
            leftIcon="password"
            type="password"
            rightIcon
            fullWidth
            placeholder="Hasło"
            label="Hasło"
            {...register('password')}
          />
          <Button
            fullWidth
            label={isLoading ? 'Proszę czekać...' : 'Zarejestruj konto za darmo'}
            type="submit"
            className="text-xl mt-4"
          />
          <div className="text-white">
            <Link
              href={{
                pathname: '/',
              }}
            >
              <span className="text-white hover:text-primary-100" onClick={onClick}>
                Zaloguj się
              </span>
            </Link>
            {` • `}
            <Link
              href={{
                pathname: '/',
              }}
            >
              <span className="text-white hover:text-primary-100" onClick={onClick}>
                Zapomniałem hasła
              </span>
            </Link>
          </div>
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
      <div className="flex justify-between items-center gap-3 my-10">
        <p className="h-1 w-full border-t-2 border-primary-100"></p>
        <p className="text-white whitespace-nowrap">lub zarejestruj się za pomocą</p>
        <p className="h-1 w-full border-t-2 border-primary-100"></p>
      </div>
      <div className="flex flex-col justify-between gap-6 text-white">
        <div className="flex gap-2 items-center bg-dark p-4 mx-auto">
          <IoLogoGoogle className="text-secondary-100 w-8 h-8" /> Zarejestruj się z Google
        </div>
        <div className="flex gap-2 items-center bg-dark p-4 mx-auto">
          <CgFacebook className="text-secondary-100 w-8 h-8" /> Zarejestruj się z Facebook
        </div>
      </div>
    </div>
  )
}
