'use client'

import { EyeIcon, PlusIcon, UsersIcon } from '@/components/icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
  className?: string
}

export default function Navigator({ className }: Props) {
  const pathname = usePathname()

  const getLinkClass = (path: string) => {
    return pathname === path
      ? 'font-medium text-bold bg-light-blue scale-105'
      : 'transition ease-in-out text-muted-foreground hover:bg-light-blue hover:scale-105 hover:duration-300'
  }

  const commonStyle = 'flex items-center gap-3 p-2 rounded-lg'

  return (
    <nav className={`${className}`}>
      {/* <Link href="/home" className={commonStyle + ' ' + getLinkClass('/')}>
        <HomeIcon className="h-6 w-6" />
        Home
      </Link> */}
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
