'use client'

import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import { BellIcon, ConeIcon, LogOutIcon, SearchIcon, SettingsIcon, UserIcon, LogInIcon } from './icons'
import { useApp } from '@/app/context/appProvider'
import { useState } from 'react'
import LoginModal from './loginModal'
import RegisterModal from './registerModal'

export default function Header() {
  const { isLoggedIn, user, logout } = useApp()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

  return (
    <>
      <header className="flex items-center justify-between bg-primary px-6 py-4 text-primary-foreground shadow-md">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <ConeIcon className="h-8 w-8" />
            <span className="text-xl font-bold">CurlARC</span>
          </Link>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search teams or records"
              className="rounded-md bg-primary-foreground/10 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
            <BellIcon className="h-6 w-6" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
                {isLoggedIn && user ? (
                  <img
                    src={user.avatarUrl || '/placeholder.svg'}
                    width={32}
                    height={32}
                    alt="User Avatar"
                    className="rounded-full"
                    style={{ aspectRatio: '32/32', objectFit: 'cover' }}
                  />
                ) : (
                  <UserIcon className="h-6 w-6" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isLoggedIn && user ? (
                <>
                  <DropdownMenuLabel>Logged in as {user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <UserIcon className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem onClick={() => setIsLoginModalOpen(true)}>
                    <LogInIcon className="mr-2 h-4 w-4" />
                    Login
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsRegisterModalOpen(true)}>
                    <UserIcon className="mr-2 h-4 w-4" />
                    Register
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
    </>
  )
}
