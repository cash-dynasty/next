'use client'
import React from 'react'
import { useSession } from 'next-auth/react'

export const UserId = () => {
  const session = useSession()
  return <p>{session?.data?.user.id}</p>
}
