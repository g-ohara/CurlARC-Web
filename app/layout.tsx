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
        <NextAuthProvider>
          <div className="flex h-screen flex-col bg-background">
            <Header className='z-50 fixed top-0 left-0 w-full h-16 flex items-center justify-between bg-primary px-6 py-4 text-primary-foreground shadow-md' />
            <div className="flex flex-grow mt-16">
              <Navigator className='z-50 fixed top-16 left-0 flex w-1/6 flex-col gap-2 bg-slate-100 p-3 shadow-md h-[calc(100vh-64px)]' />
              <div className="flex w-5/6 ml-[16.666%]">
                {children}
              </div>
            </div>
          </div>
        </NextAuthProvider>
      </body>
    </html>
  )
}
