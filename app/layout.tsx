import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/app/components/header'
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
      <head>
        <title>CurlARC</title>
        <meta name="google-site-verification" content="ltzC2lfAPsWQrkjLjcrfObIh2DunayQMnk23mHf3H4c" />
      </head>
      <body className={inter.className}>
        <NextAuthProvider>
          <div className="flex h-screen flex-col bg-background">
            <Header className='z-50 fixed top-0 left-0 w-full h-16 flex items-center justify-between bg-primary px-6 py-4 text-primary-foreground shadow-md' />
            <div className="flex flex-grow w-full">
              {children}
            </div>
          </div>
        </NextAuthProvider>
      </body>
    </html>
  )
}
