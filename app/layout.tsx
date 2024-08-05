import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/app/components/header'
import Navigator from '@/app/components/navigator'
import RecordButton from '@/app/components/recordButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CurlARC',
  description: 'CurlARC is a simple application for recording your curling game.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-background flex h-screen flex-col">
          <Header />
          <div className="flex flex-1">
            <Navigator />
            {children}
            <RecordButton />
          </div>
        </div>
      </body>
    </html>
  )
}
