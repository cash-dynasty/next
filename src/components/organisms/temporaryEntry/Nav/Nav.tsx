'use client'

import { useSession } from 'next-auth/react'
import { LoggedInNav, LoggedOutNav } from './parts'

export const Nav = () => {
  const session = useSession()
  return <div>{session?.data?.user ? <LoggedInNav /> : <LoggedOutNav />}</div>
}
