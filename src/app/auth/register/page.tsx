'use client'
import { TextInput } from '@/components/atoms/TextInput'
import { useRef, useState } from 'react'
import { Button } from '@/components/atoms/Button'
import axios from 'axios'
import { normalizeText } from '@/utils/textFormatters'
import { verifyCaptcha } from '@/utils/serverActions'
import ReCAPTCHA from 'react-google-recaptcha'

export default function Register() {
  const [username, setUsernane] = useState<string | undefined>('')
  const [password, setPassword] = useState<string | undefined>('')
  const [email, setEmail] = useState<string | undefined>('')

  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [isVerified, setIsVerified] = useState<boolean>(false)
  console.log(isVerified, 'test')

  const register = async () =>
    await axios.post('http://localhost:3000/api/auth/register', {
      username,
      password,
      email,
    })

  const handleVerifyCaptcha = async (token: string | null) => {
    console.log(token, 'test')
    await verifyCaptcha(token)
      .then(() => setIsVerified(true))
      .catch(() => setIsVerified(false))
  }

  return (
    <div className="h-screen bg-slate-700">
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
          <ReCAPTCHA
            sitekey="6LfunUYoAAAAAF6S3ulk74sMe0MoBmIZD27gWMSJ"
            ref={recaptchaRef}
            onChange={handleVerifyCaptcha}
            className="flex justify-center my-4"
          />
          <Button
            label="Zarejestruj albo wyjebie cię z serwera"
            onClick={register}
            disabled={!isVerified}
          />
        </div>
      </div>
    </div>
  )
}
