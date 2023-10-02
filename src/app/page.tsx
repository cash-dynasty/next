'use client'

import { Button } from '@atoms/Button'

import Link from 'next/link'
import { useSendConfirmationMailMutation } from '@/api'
import dayjs from 'dayjs'

export default function Home() {
  const [sendMail] = useSendConfirmationMailMutation()

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
      </div>
    </div>
  )
}
