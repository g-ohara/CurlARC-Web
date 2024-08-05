import Link from 'next/link'
import { EyeIcon, HomeIcon, PlusIcon, UsersIcon } from './icons'

export default function Navigator() {
  return (
    <nav className="flex flex-col gap-6 border-r border-primary-foreground/10 bg-primary-foreground/5 p-6">
      <Link
        href="/"
        className="flex items-center gap-3 font-medium text-primary hover:text-primary-foreground"
        prefetch={false}
      >
        <HomeIcon className="h-6 w-6" />
        Home
      </Link>
      <Link
        href="/team"
        className="flex items-center gap-3 text-muted-foreground hover:text-foreground"
        prefetch={false}
      >
        <UsersIcon className="h-6 w-6" />
        My Teams
      </Link>
      <Link
        href="/record"
        className="flex items-center gap-3 text-muted-foreground hover:text-foreground"
        prefetch={false}
      >
        <PlusIcon className="h-6 w-6" />
        Create Record
      </Link>
      <Link
        href="/record"
        className="flex items-center gap-3 text-muted-foreground hover:text-foreground"
        prefetch={false}
      >
        <EyeIcon className="h-6 w-6" />
        Following
      </Link>
    </nav>
  )
}
