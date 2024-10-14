import { EyeIcon, HomeIcon, PlusIcon, UsersIcon } from '@/components/icons'
import Link from 'next/link'

import { getTeamsByUserId } from '@/lib/api/team'
import { getServerSession } from 'next-auth'
import { getInvitedTeams } from '@/lib/api/team'

type Props = {
  className?: string
}

export default async function Navigator({ className }: Props) {

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
    <nav className={className}>
      <div className="flex">
        <UsersIcon className="h-6 w-6 mr-2" />My Teams
      </div>
      {teams?.map((team) => (
        <Link
          href={`/${team.id}`}
          key={team.id}
          className="ml-4"
        >
          {team.name}
        </Link>
      ))
      }
      <div className="flex">
        <UsersIcon className="h-6 w-6 mr-2" />Invited Teams
      </div>
      {invitedTeams?.map((team) => (
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

