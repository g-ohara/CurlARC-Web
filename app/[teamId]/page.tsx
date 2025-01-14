'use server'

import React from 'react'
import { TeamCard } from './components/teamCard'
import { getTeamDetailsByTeamId } from '@/lib/api/team'

export default async function TeamPage(props: { params: { teamId: string } }) {
  const teamRes = await getTeamDetailsByTeamId(props.params.teamId)
  return (
    <main className="flex-1 p-8">
      <TeamCard
        teamId={props.params.teamId}
        teamName={teamRes.team.name}
      />
    </main>
  )
}
