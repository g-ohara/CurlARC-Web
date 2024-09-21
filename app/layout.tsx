import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Navigator from '@/components/navigator'
import { AppProvider } from './context/appProvider'
import { SessionProvider } from 'next-auth/react'
import NextAuthProvider from './providers/NextAuth'

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
          <AppProvider>
            <Header />
            <div className="flex h-screen">
              <Navigator />
              <div className="flex w-full">
                <NextAuthProvider>
                  {children}
                </NextAuthProvider>
              </div>
              {/* <RecordButton /> */}
            </div>
          </AppProvider>
        </div>
      </body>
    </html>
  )
}
