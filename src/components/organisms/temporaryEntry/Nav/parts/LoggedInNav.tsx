import { Button } from '@atoms'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

const navigationList = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Player',
    href: '/temp/player',
  },
  {
    label: 'Chat',
    href: '/temp/chat',
  },
  {
    label: 'Wyloguj',
    onClick: signOut,
  },
]

export const LoggedInNav = () => {
  return (
    <div className="absolute top-0 right-0 flex gap-1">
      {navigationList.map((item) =>
        item.onClick ? (
          <Button label={item.label} onClick={item.onClick} key={item.label} />
        ) : (
          <Link
            href={{
              pathname: item.href,
            }}
            key={item.label}
          >
            <Button label={item.label} />
          </Link>
        ),
      )}
    </div>
  )
}
