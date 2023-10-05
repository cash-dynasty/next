'use client'

import { Button } from '@atoms/Button'

import Link from 'next/link'
import { useSendConfirmationMailMutation } from '@/api'
import dayjs from 'dayjs'
import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import { TextInput } from '@/components/atoms/TextInput'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { cn } from '@/utils/styles'

const socket = io('http://localhost:3001')

export default function Home() {
  const session = useSession()

  console.log(session)

  const [sendMail] = useSendConfirmationMailMutation()
  const [message, setMessage] = useState<string[]>([])
  const [newMessage, setNewMessage] = useState('')

  const getDbMessages = async () => {
    await axios
      .get('http://localhost:3000/api/chat')
      .then((res) => {
        console.log('messagesData', res.data.data)
        const messagesArray = res.data.data.map(({ content }: { content: string }) => content)
        console.log('messagesArray', messagesArray)
        setMessage(messagesArray)
      })
      .then((res) => {
        console.log('res::::::', res)
      })
      .catch((err) => {
        console.log('error:::::', err)
      })
  }

  useEffect(() => {
    socket.on('chat', (data) => {
      console.log('data', data)
      setMessage((prev: string[]) => [...prev, data])
    })
    getDbMessages()
  }, [])

  const sendMessage = () => {
    socket.emit('chat', {
      userId: session.data?.user.id,
      conversation: 'ec81dd75-2d99-49e2-9148-b710f8677db6',
      message: newMessage,
    })
    setNewMessage('')
  }

  return (
    <div className="h-screen bg-slate-700 flex flex-col items-center justify-center gap-5">
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Button label="ATAKUJ" />
        <Link href="/auth/register">Register nju account</Link>
        <Button
          label="Wyslij email"
          onClick={() =>
            sendMail({
              confirmationToken: 'test',
              mailTo: 'dev@cashdynasty.pl',
              username: 'vezo',
              validFor: dayjs().toDate(),
            })
          }
        />
        <TextInput
          placeholder="message"
          type="text"
          value={newMessage}
          onChange={({ target }) => setNewMessage(target.value)}
        />
        <Button label="Send message" onClick={sendMessage} />
        {message.map((msg, i) => (
          <p key={i} className={cn({ ['text-right']: session.data?.user.id })}>
            {msg}
          </p>
        ))}
      </div>
    </div>
  )
}
