'use client'

import { Button } from '@atoms'

import { useSendConfirmationMailMutation } from '@/api'
import dayjs from 'dayjs'
import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import { TextInput } from '@/components/atoms/TextInput'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { cn } from '@/utils/styles'

const url = process.env.NEXT_PUBLIC_WS_SERVER_URL || 'http://130.162.55.95:3001'

console.log('NEXT_PUBLIC_WS_SERVER_URL', process.env.NEXT_PUBLIC_WS_SERVER_URL)
console.log('NEXT_PUBLIC_BASE_URL', process.env.NEXT_PUBLIC_BASE_URL)

const socket = io(url)

export default function Home() {
  const session = useSession()

  const [sendMail] = useSendConfirmationMailMutation()
  const [message, setMessage] = useState<string[]>([])
  const [newMessage, setNewMessage] = useState('')

  const getDbMessages = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chat`)
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
        <h1 className="text-white">Testowanie wysyłania maila</h1>
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
        <p />
        <h1 className="text-white">Chat</h1>
        <TextInput
          placeholder="New message"
          type="text"
          value={newMessage}
          onChange={({ target }) => setNewMessage(target.value)}
        />

        <Button label="Wyślij wiadomość" onClick={sendMessage} />
        {message.map((msg, i) => (
          <p key={i} className={cn({ ['text-right']: session.data?.user.id })}>
            {msg}
          </p>
        ))}
      </div>
    </div>
  )
}
