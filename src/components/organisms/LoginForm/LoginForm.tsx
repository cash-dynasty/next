'use client'

import { Button, TextInput } from '@atoms'
import Link from 'next/link'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signIn, useSession } from 'next-auth/react'

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required()

type FormData = yup.InferType<typeof schema>

export const LoginForm = () => {
  const session = useSession()

  const handleLogin = async (data: FormData) => {
    console.log(data)
    const { username, password } = data
    await signIn('credentials', { username, password })
  }

  const { register, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  if (session.status === 'authenticated') {
    return (
      <div className="w-full bg-slate-800 p-8">
        <div className="flex flex-col gap-4 items-center">
          <p className="text-white">Jesteś zalogowany jako</p>
          <p className="text-white text-xl">{session.data?.user?.username}</p>
          <p className="text-white text-xl">{session.data?.user?.email}</p>
          <p className="text-white text-xl">{session.data?.user?.id}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-slate-800 p-8">
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="flex flex-col gap-4 items-center">
          <TextInput leftIcon fullWidth placeholder="Nazwa użytkownika" {...register('username')} />
          <TextInput
            leftIcon
            fullWidth
            placeholder="Hasło"
            {...register('password')}
            type="password"
          />
          <Button fullWidth label="Zaloguj" type="submit" />
          <div className="text-white">
            <Link
              href={{
                pathname: '/auth/register',
              }}
            >
              <span className="text-amber-500">Zarejestruj się</span>
            </Link>
            {` • `}
            <Link
              href={{
                pathname: '/auth/register',
              }}
            >
              <span className="text-amber-500">Zapomniałem hasła</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
