'use client';

import { UsersIcon } from '@/components/icons'
import Link from 'next/link'
import { getTeamsByUserId, getInvitedTeams } from '@/lib/api/team'
import { usePathname } from 'next/navigation'
import { Team } from '@/types/model'
import clsx from 'clsx'
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import CreateTeamsButton from './createTeamsButton';
import AcceptInvitationButton from './acceptInvitationButton';

type Props = {
  className?: string
}

export default function Navigator({ className }: Props) {
  const pathname = usePathname();
  const currentTeamId = pathname.split('/')[1];
  const { data: session } = useSession();

  const [teams, setTeams] = useState<Team[]>([]);
  const [invitedTeams, setInvitedTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        try {
          const teamsRes = await getTeamsByUserId();
          setTeams(teamsRes.teams);

          const invitedTeamsRes = await getInvitedTeams();
          setInvitedTeams(invitedTeamsRes.teams);
        } catch (error) {
          console.error('Error fetching teams:', error);
        }
      }
    };

    fetchData();
  }, [session]);

  return (
    <nav className={clsx('p-4 bg-gray-200 shadow-md', className)}>
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <UsersIcon className="h-6 w-6 mr-2 text-blue-500" />
          <span className="font-semibold text-lg">My Teams</span>
        </div>
        <ul className="space-y-2">
          {teams?.map((team) => (
            <li key={team.id}>
              <Link
                href={`/${team.id}`}
                className={clsx(
                  'block px-3 py-2 rounded-md hover:bg-blue-100 transition',
                  currentTeamId === `${team.id}` ? 'bg-blue-200 font-bold text-blue-600' : 'text-gray-800'
                )}
              >
                {team.name}
              </Link>
            </li>
          ))}
          <CreateTeamsButton />
        </ul>
      </div>

      <div>
        <div className="flex items-center mb-2">
          <UsersIcon className="h-6 w-6 mr-2 text-green-500" />
          <span className="font-semibold text-lg">Invited Teams</span>
        </div>
        <ul className="space-y-2">
          {invitedTeams?.map((team) => (
            <li key={team.id}             >
              <div className="flex items-center gap-3 px-3 py-2">
                {team.name}
                <AcceptInvitationButton
                  teamId={team.id}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
