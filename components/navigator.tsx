'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { EyeIcon, HomeIcon, PlusIcon, UsersIcon } from './icons'

export default function Navigator() {
  const pathname = usePathname()

  const getLinkClass = (path: string) => {
    return pathname === path
      ? 'font-medium text-bold bg-light-blue'
      : 'transition ease-in-out text-muted-foreground hover:bg-light-blue hover:scale-110 hover:duration-300'
  }

  const commonStyle = 'flex items-center gap-3 p-2 rounded-lg'

  return (
    <nav className="m-5 flex w-1/5 flex-col gap-2 border-r border-primary-foreground/10 bg-primary-foreground/5">
      <Link href="/" className={commonStyle + ' ' + getLinkClass('/')}>
        <HomeIcon className="h-6 w-6" />
        Home
      </Link>
      <Link href="/team" className={commonStyle + ' ' + getLinkClass('/team')}>
        <UsersIcon className="h-6 w-6" />
        My Teams
      </Link>
      <Link href="/record" className={commonStyle + ' ' + getLinkClass('/record')}>
        <PlusIcon className="h-6 w-6" />
        Create Record
      </Link>
      <Link href="/view" className={commonStyle + ' ' + getLinkClass('/view')}>
        <EyeIcon className="h-6 w-6" />
        View Records
      </Link>
    </nav>
  )
}
