'use client'
import { TextInput } from '@/components/atoms/TextInput'
import { useState } from 'react'
import { Button } from '@/components/atoms/Button'
import { signIn } from 'next-auth/react'

export default function Login() {
  const [username, setUsernane] = useState<string | undefined>('')
  const [password, setPassword] = useState<string | undefined>('')

  const handleLogin = async () => await signIn('credentials', { username, password })

  return (
    <div className="h-screen bg-slate-700 flex flex-col gap-5">
      <TextInput
        leftIcon
        placeholder="Username"
        type="text"
        value={username}
        onChange={(e) => setUsernane(e.target.value)}
      />
      <TextInput
        leftIcon
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button label="Zaloguj" onClick={handleLogin} />
    </div>
  )
}
