import { Button } from '@atoms'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

export const LoggedInNav = () => {
  return (
    <div className="absolute top-0 right-0 flex gap-1">
      <Link href="/">
        <Button label="Home" />
      </Link>
      <Link
        href={{
          pathname: '/temp/chat',
        }}
      >
        <Button label="Chat" />
      </Link>
      <Button label="Wyloguj" onClick={() => signOut()} />
    </div>
  )
}
