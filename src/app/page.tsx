'use client'
import Image from 'next/image'
import { Button } from '@atoms/Button'
import { TextInput } from '@atoms/TextInput'
import { useState } from 'react'
import { MenuBar } from '@molecules/MenuBar'

export default function Home() {
  const [input, setInput] = useState<string | undefined>('')
  return (
    <div className="h-[100vh] bg-black">
      <Button label="ATAKUJ" />
      <TextInput
        leftIcon
        placeholder="Username"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <MenuBar />
    </div>
  )
}
