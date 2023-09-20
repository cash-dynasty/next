'use client'
import { TextInput } from '@/components/atoms/TextInput'
import { useState } from 'react'
import { Button } from '@/components/atoms/Button'
import axios from 'axios'

export default function Register() {
  const [username, setUsernane] = useState<string | undefined>('')
  const [password, setPassword] = useState<string | undefined>('')
  const [email, setEmail] = useState<string | undefined>('')

  console.log(username, password)
  const register = async () =>
    await axios.post('http://localhost:3000/api/auth/register', {
      username,
      password,
      email,
    })

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
      <TextInput
        leftIcon
        placeholder="Email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button label="Zarejestruj" onClick={register} />
    </div>
  )
}
