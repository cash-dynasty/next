'use client'
import { Button, TextInput } from '@atoms'
import { useEffect, useState } from 'react'
import { Message as MessageType, User } from '@prisma/client'
import { Message } from '@molecules'
import io from 'socket.io-client'
import { useSession } from 'next-auth/react'
import axios from 'axios'

type MessagesList = MessageType & { from: { username: User['username'] } }

const url = process.env.NEXT_PUBLIC_WS_SERVER_URL || 'http://130.162.55.95:3001'
const socket = io(url)

export default function Chat() {
  const session = useSession()
  const [newMessage, setNewMessage] = useState<string>('')
  const [messages, setMessages] = useState<MessagesList[]>([])
  const [onlineUsers, setOnlineUsers] = useState(0)

  const getMessages = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chat`).then((res) => {
      setMessages(res.data.data)
    })
  }

  console.log('socketID', socket.id)

  console.log(messages)

  useEffect(() => {
    getMessages()
  }, [])

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

  return (
    <div className="h-screen bg-slate-700 flex flex-col items-center justify-center gap-5">
      <h1>Chat</h1>
      <div className="flex flex-col gap-4 w-full max-w-sm ">
        <div>
          {messages.slice(-5).map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>
        <TextInput
          placeholder="New message"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />

        <Button label="Wyślij wiadomość" onClick={sendMessage} />
        {onlineUsers}
      </div>
    </div>
  )
}
