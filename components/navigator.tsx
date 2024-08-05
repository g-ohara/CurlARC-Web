'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { EyeIcon, HomeIcon, PlusIcon, UsersIcon } from './icons'

export default function Navigator() {
  const pathname = usePathname()

  const getLinkClass = (path: string) => {
    return pathname === path
      ? 'flex items-center gap-3 font-medium text-bold bg-light-blue p-2 rounded-lg'
      : 'flex items-center gap-3 text-muted-foreground p-1 hover:text-foreground'
  }

  return (
    <nav className="flex flex-col gap-5 border-r border-primary-foreground/10 bg-primary-foreground/5 m-5 w-1/5 bg-light-blue">
      <Link href="/" className={getLinkClass('/')}>
        <HomeIcon className="h-6 w-6" />
        Home
      </Link>
      <Link href="/team" className={getLinkClass('/team')}>
        <UsersIcon className="h-6 w-6" />
        My Teams
      </Link>
      <Link href="/record" className={getLinkClass('/record')}>
        <PlusIcon className="h-6 w-6" />
        Create  Record
      </Link>
      <Link href="/view" className={getLinkClass('/view')}>
        <EyeIcon className="h-6 w-6" />
        View Records
      </Link>
    </nav>
  )
}
