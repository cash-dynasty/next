'use client'
import Image from 'next/image'
import { Button } from '@atoms/Button'
import { TextInput } from '@atoms/TextInput'
import { useState } from 'react'

export default function Home() {
  const [input, setInput] = useState<string>('')
  return (
    <div className="h-[100vh] bg-black">
      <Button label="ATAKUJ" />
      <br />
      <br />
      <TextInput
        leftIcon
        placeholder="Username"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  )
}
