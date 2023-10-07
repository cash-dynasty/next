'use client'
import { useSession } from 'next-auth/react'
import { MainHeader } from './MainHeader'
import { SubHeader } from './SubHeader'

export const Header = () => {
  const session = useSession()
  return <div>{session?.data?.user ? <MainHeader /> : <SubHeader />}</div>
}
