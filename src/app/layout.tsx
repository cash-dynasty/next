import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/app/providers'
import { Nav } from '@organisms'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cash Dynasty',
  description: 'The best way to make money online',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className + ' relative'}>
        <Providers>
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  )
}
