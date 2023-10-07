import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/app/providers'
import { Header } from '@/components/organisms/Navigation/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cash Dynasty',
  description: 'hmmmmmmmm hm',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className + ' relative'}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
