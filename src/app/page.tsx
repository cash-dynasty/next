'use client'
import { Button } from '@atoms/Button'
import { TextInput } from '@atoms/TextInput'
import { useState } from 'react'
// import { MenuBar } from '@molecules/MenuBar'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function Home() {
  const [input, setInput] = useState<string | undefined>('')
  const session = useSession()
  return (
    <div className="h-[100vh] bg-amber-200">
      <Button label="ATAKUJ" />
      <TextInput
        leftIcon
        placeholder="Username"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {/*<MenuBar />*/}
      <Link href={'/start'}>go to start</Link>
      {JSON.stringify(session)}
    </div>
  )
}
