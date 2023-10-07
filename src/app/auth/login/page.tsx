'use client'
import { TextInput } from '@/components/atoms/TextInput'
import { useState } from 'react'
import { Button } from '@/components/atoms/Button'
import { signIn } from 'next-auth/react'
import Form from '@/components/organisms/Form/Form'
import Link from 'next/link'

export default function Login() {
  const [username, setUsernane] = useState<string | undefined>('')
  const [password, setPassword] = useState<string | undefined>('')

  const handleLogin = async () => await signIn('credentials', { username, password })

  return (
    <div className="h-full flex items-center justify-center">
      <Form>
        <TextInput
          leftIcon
          fullWidth
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsernane(e.target.value)}
        />
        <TextInput
          leftIcon
          fullWidth
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button label="Zaloguj" onClick={handleLogin} />
        <Link href="/auth/register" className="cursor-pointer">
          <div className="flex justify-center text-white">Nie masz konta? Zarejestruj sie!</div>
        </Link>
      </Form>
    </div>
  )
}
