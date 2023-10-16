import './globals.css'
import type { Metadata } from 'next'
import { Saira } from 'next/font/google'
import { Providers } from '@/app/providers'
import { Nav } from '@organisms'

const saira = Saira({ subsets: ['latin'], variable: '--font-saira' })

export const metadata: Metadata = {
  title: 'Cash Dynasty',
  description: 'The best way to make money online',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${saira.variable}`}>
      <body className="relative">
        <Providers>
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  )
}
