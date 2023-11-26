'use client'

import { Button, TextInput, Typography } from '@atoms'
import Link from 'next/link'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Logo from '@/images/logo.svg'
import { IoLogoGoogle } from 'react-icons/io5'
import { CgFacebook } from 'react-icons/cg'

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required()

type FormData = yup.InferType<typeof schema>

type LoginProps = {
  onClick?: () => void
}

export const LoginForm = ({ onClick }: LoginProps) => {
  const session = useSession()

  const handleLogin = async (data: FormData) => {
    console.log(data)
    const { email, password } = data
    await signIn('credentials', {
      email,
      password,
      callbackUrl: '/',
      redirect: false,
    })
    //TODO parse returned json in ERROR field and display toast or message with corresponding error
  }

  const { register, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  if (session.status === 'authenticated') {
    const { email, id, role } = session.data?.user
    return (
      <div className="w-full bg-slate-800 p-8">
        <div className="flex flex-col gap-4 items-center">
          <p className="text-white">Jesteś zalogowany jako</p>
          <p className="text-white text-xl">{email}</p>
          <p className="text-white text-xl">{id}</p>
          <p className="text-white text-xl">{role}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full backdrop-blur-md bg-[#08152D]/80 py-10 lg:py-16 px-10 lg:px-20 font-saira rounded">
      <Image src={Logo} alt="Cash Dynasty logo" className="pb-20" />
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="flex flex-col gap-6 items-center">
          <TextInput
            leftIcon="person"
            fullWidth
            placeholder="Adres e-mail"
            label="Adres e-mail"
            {...register('email')}
          />
          <TextInput
            leftIcon="password"
            fullWidth
            placeholder="Hasło"
            type="password"
            label="Hasło"
            rightIcon
            {...register('password')}
          />
          <Button fullWidth label="Zaloguj" type="submit" className="text-xl mt-4" />
          <div className="text-white">
            <Link
              href={{
                pathname: '/',
              }}
            >
              <span className="text-white hover:text-primary-100" onClick={onClick}>
                Zarejestruj się
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
      <Typography variant="h1" size="md">
        test
      </Typography>
      <div className="flex justify-between items-center gap-3 my-10">
        <p className="h-1 w-full border-t-2 border-primary-100"></p>
        <p className="text-white whitespace-nowrap">lub zaloguj się za pomocą</p>
        <p className="h-1 w-full border-t-2 border-primary-100"></p>
      </div>
      <div className="flex flex-col justify-between gap-6 text-white">
        <div className="flex gap-2 items-center bg-dark p-4 mx-auto">
          <IoLogoGoogle className="text-secondary-100 w-8 h-8" /> Zaloguj się z Google
        </div>
        <div className="flex gap-2 items-center bg-dark p-4 mx-auto">
          <CgFacebook className="text-secondary-100 w-8 h-8" /> Zaloguj się z Facebook
        </div>
      </div>
    </div>
  )
}
