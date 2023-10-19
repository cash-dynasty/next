import { Button } from '@atoms'
import Link from 'next/link'

export const LoggedOutNav = () => {
  return (
    <div className="absolute top-0 right-0 flex gap-1 z-50">
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
          pathname: '/auth/register',
        }}
      >
        <Button label="Rejestracja" />
      </Link>
      <Link
        href={{
          pathname: '/auth/login',
        }}
      >
        <Button label="Zaloguj" />
      </Link>
    </div>
  )
}
