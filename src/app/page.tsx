'use client'
import { Button, TextInput } from '@atoms'

import { useSendConfirmationMailMutation } from '@/api'
import dayjs from 'dayjs'
import { useState } from 'react'
import Form from '@/components/organisms/Form/Form'

export default function Home() {
  const [sendMail] = useSendConfirmationMailMutation()
  const [email, setEmail] = useState('')

  return (
    <div className="h-screen bg-slate-700 flex flex-col items-center justify-center gap-5">
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Form>
          <h1 className="text-white">Testowanie wysyłania maila</h1>
          <TextInput
            fullWidth
            placeholder="Adres email"
            type="text"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <Button
            label="Wyslij email"
            onClick={() =>
              sendMail({
                confirmationToken: 'test',
                mailTo: email,
                username: 'admin',
                validFor: dayjs().toDate(),
              })
            }
          />
        </Form>
      </div>
    </div>
  )
}
