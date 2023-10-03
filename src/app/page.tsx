'use client'

import { Button } from '@atoms/Button'

import Link from 'next/link'
import { useSendConfirmationMailMutation } from '@/api'
import dayjs from 'dayjs'
import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import { TextInput } from '@/components/atoms/TextInput'
import axios from 'axios'

const socket = io('http://localhost:3001')

export default function Home() {
  const [sendMail] = useSendConfirmationMailMutation()
  const [message, setMessage] = useState([])
  const [newMessage, setNewMessage] = useState('')

  const getDbMessages = async () => {
    const data = await axios.get('http://localhost:3000/api/chat').then((res) => {
      const messagesArray = res.data.data.map((msg) => msg.msg)
      console.log('messagesArray', messagesArray)
      setMessage(messagesArray)
    })
    console.log(data)
  }

  useEffect(() => {
    socket.on('chat', (data) => {
      console.log('data', data)
      setMessage((prev) => [...prev, data])
    })
    getDbMessages()
  }, [])

  const sendMessage = () => {
    socket.emit('chat', newMessage)
    setNewMessage('')
  }

  return (
    <div className="h-screen bg-slate-700 flex flex-col items-center justify-center gap-5">
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Button label="ATAKUJ" />
        {/* <MenuBar /> */}
        <Link href="/start">Go to start</Link>
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
          <p key={i}>{msg}</p>
        ))}
      </div>
    </div>
  )
}
