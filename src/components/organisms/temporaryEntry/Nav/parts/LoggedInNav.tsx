import { Button } from '@atoms'
import Link from 'next/link'

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
      <Link
        href={{
          pathname: '/api/auth/signout',
        }}
      >
        <Button label="Wyloguj" />
      </Link>
    </div>
  )
}