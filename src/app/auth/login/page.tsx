'use client'
import { TextInput } from '@/components/atoms/TextInput'
import { Button } from '@/components/atoms/Button'
import { signIn, useSession } from 'next-auth/react'
import Form from '@/components/organisms/Form/Form'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup
  .object({
    userName: yup.string().required(),
    password: yup.string().required(),
  })
  .required()

type FormData = yup.InferType<typeof schema>

export default function Login() {
  const session = useSession()
  if (session?.data?.user) {
    redirect('/')
  }

  const handleLogin = async (data: FormData) => {
    const { userName, password } = data
    await signIn('credentials', { userName, password })
  }

  const { register, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  return (
    <div className="h-full flex items-center justify-center">
      <Form onSubmit={handleSubmit(handleLogin)}>
        <TextInput leftIcon fullWidth placeholder="Nazwa użytkownika" {...register('userName')} />
        <TextInput leftIcon fullWidth placeholder="Hasło" {...register('password')} />
        <Button label="Zaloguj" type="submit" />
        <Link href="/auth/register" className="cursor-pointer">
          <div className="flex justify-center text-white">Nie masz konta? Zarejestruj sie!</div>
        </Link>
      </Form>
    </div>
  )
}
