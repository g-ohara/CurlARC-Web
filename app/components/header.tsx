import Link from 'next/link'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from '@/app/components/ui/dropdown-menu'
import { BellIcon, ConeIcon, LogOutIcon, SearchIcon, SettingsIcon, UserIcon } from './icons'

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground flex items-center justify-between px-6 py-4 shadow-md">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <ConeIcon className="h-8 w-8" />
          <span className="text-xl font-bold">CurlARC</span>
        </Link>
        <div className="relative">
          <SearchIcon className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" />
          <Input
            type="search"
            placeholder="Search teams or records"
            className="bg-primary-foreground/10 focus:ring-primary rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
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
              <img
                src="/placeholder.svg"
                width={32}
                height={32}
                alt="User Avatar"
                className="rounded-full"
                style={{ aspectRatio: '32/32', objectFit: 'cover' }}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Logged in as</DropdownMenuLabel>
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
            <DropdownMenuItem>
              <LogOutIcon className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
