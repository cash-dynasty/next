'use client'
import { useGetPlayerInfoQuery } from '@/api'
import { useSession } from 'next-auth/react'

export default function PlayerPage() {
  const session = useSession()
  const data = useGetPlayerInfoQuery({ userId: session.data?.user.id })

  console.log(data)
  return (
    <div className="text-white-100">
      <h1>Hello</h1>
    </div>
  )
}
