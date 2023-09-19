'use client'
import { Button } from '@atoms/Button'
import { TextInput } from '@atoms/TextInput'
import { useState } from 'react'
// import { MenuBar } from '@molecules/MenuBar'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import axios from 'axios'

export default function Home() {
  const [input, setInput] = useState<string | undefined>('')
  const session = useSession()

  const sendMail = async () => {
    await axios.get('http://localhost:3000/api/sendMail')
  }
  return (
    <div className="h-screen bg-amber-200 flex flex-col gap-5">
      <Button label="ATAKUJ" />
      <TextInput leftIcon placeholder="Username" type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      {/*<MenuBar />*/}
      <Link href={'/start'}>go to start</Link>
      {JSON.stringify(session)}
      <Button label="send email" onClick={sendMail} />
    </div>
  )
}
