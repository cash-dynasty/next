'use client'

import { useGetPlayerInfoQuery } from '@/api'

export default function Player() {
  const data = useGetPlayerInfoQuery()

  console.log(data)
  return (
    <div className="text-white-100">
      <h1>Hello</h1>
    </div>
  )
}
