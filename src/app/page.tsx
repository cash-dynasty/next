'use client'
import { Button } from '@atoms/Button'

import Link from 'next/link'
import axios from 'axios'

export default function Home() {
  const sendMail = async () => {
    await axios.get('http://localhost:3000/api/sendMail')
  }
  return (
    <div className="h-screen bg-slate-700 flex flex-col gap-5">
      <Button label="ATAKUJ" />

      {/*<MenuBar />*/}
      <Link href={'/start'}>go to start</Link>

      <Link href={'/auth/register'}>Register nju account</Link>
      <Button label="send email" onClick={sendMail} />
    </div>
  )
}
