'use client'
import { Button, TextInput } from '@atoms'

import { useEffect, useRef, useState } from 'react'
import { Message as MessageType, User } from '@prisma/client'
import { Message } from '@molecules'

import io from 'socket.io-client'
import { useSession } from 'next-auth/react'
import axios from 'axios'

type MessagesList = MessageType & { from: { username: User['username'] } }

const url = process.env.NEXT_PUBLIC_WS_SERVER_URL || 'http://130.162.55.95:3001'
const socket = io(url)

export default function Chat() {
  const messageBottomRef = useRef<HTMLDivElement>(null)
  const session = useSession()
  const [newMessage, setNewMessage] = useState<string>('')
  const [messages, setMessages] = useState<MessagesList[]>([])
  const [onlineUsers, setOnlineUsers] = useState(0)

  const getMessages = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chat`).then((res) => {
      setMessages(res.data.data)
    })
  }

  useEffect(() => {
    getMessages()
  }, [])

  useEffect(() => {
    if (messages.length) {
      messageBottomRef.current?.scrollIntoView({ block: 'end' })
    }
  }, [messages])

  useEffect(() => {
    if (session.status === 'authenticated' && session.data?.user) {
      socket.emit('userConnected', session.data.user.id)
      socket.on('chat', (data) => {
        setMessages((prev) => [...prev, data])
      })
      socket.on('onlineUsers', (data) => {
        setOnlineUsers(data)
      })
    }
  }, [session?.data?.user, session.status])

  const sendMessage = () => {
    socket.emit('sendChatMessage', {
      userId: session.data?.user.id,
      conversation: 'ce779cec-d270-4649-b766-6e8bc0945a75',
      message: newMessage,
    })
    setNewMessage('')
  }

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newMessage !== '') {
      sendMessage()
    }
  }

  const handleCheck = () => {
    socket.emit('check', {
      userId: session.data?.user.id,
    })
  }

  return (
    <div className="h-screen bg-slate-700 flex flex-col items-center justify-center gap-5">
      <h1 className="text-white">Chat</h1>
      <p className="text-white text-xs">Online: {onlineUsers}</p>
      <div className="flex flex-col gap-4 w-full max-w-sm ">
        <div className="max-h-[400px] overflow-y-scroll no-scrollbar">
          {messages.slice(-30).map((message) => (
            <Message key={message.id} message={message} />
          ))}
          <div ref={messageBottomRef} />
        </div>
        <form onSubmit={handleSendMessage}>
          <div className="flex justify-between gap-2">
            <TextInput
              placeholder="New message"
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              fullWidth
            />
            <Button label="Wyślij" type="submit" />
          </div>
        </form>
      </div>
      <Button label="Check" onClick={handleCheck} />
      {/*<ChatUsersList />*/}
    </div>
  )
}
