import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/app/components/header'
import NextAuthProvider from './providers/NextAuth'
import Navigator from './components/navigator'

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
        <div className="z-0 flex h-screen flex-col bg-background">
          <NextAuthProvider>
            <Header />
            <div className="flex h-screen">
              <Navigator />
              <div className="flex w-5/6">
                  {children}
              </div>
              {/* <RecordButton /> */}
            </div>
          </NextAuthProvider>
        </div>
      </body>
    </html>
  )
}
