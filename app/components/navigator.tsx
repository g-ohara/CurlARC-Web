import { EyeIcon, HomeIcon, PlusIcon, UsersIcon } from '@/components/icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { getTeamsByUserId } from '@/lib/api/team'
import { getServerSession } from 'next-auth'
import { getInvitedTeams } from '@/lib/api/team'

export default async function Navigator() {

  const commonStyle = 'flex items-center gap-3 p-2 rounded-lg'

  const session = await getServerSession()

  let teams = []
  let invitedTeams = []
  if (session) {
    const teamsRes = await getTeamsByUserId()
    teams = teamsRes.teams
    const invitedTeamsRes = await getInvitedTeams()
    invitedTeams = invitedTeamsRes.teams
  }

  return (
    <nav className="flex w-1/6 flex-col gap-2 bg-slate-100 p-3 shadow-md">
      {/* <Link href="/home" className={commonStyle + ' ' + getLinkClass('/')}>
        <HomeIcon className="h-6 w-6" />
        Home
      </Link> */}
      <UsersIcon className="h-6 w-6" />My Teams
      {teams?.map((team) => (
        <Link
          href={`/${team.id}`}
          key={team.id}
        >
          {team.name}
        </Link>
      ))
      }
    </nav>
  )
}

