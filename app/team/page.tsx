'use server'

import React from 'react'
import { getTeamsByUserId } from '@/lib/api/team'
import CreateTeamsButton from './components/buttons/createTeamsButton'
import ViewInvitedTeamsButton from './components/buttons/viewInvitedTeamsButton'
import { getServerSession } from 'next-auth'
import TeamCards from './components/teamCards'
import { getInvitedTeams } from '@/lib/api/team'

const teamDetailsDummy = [
  { key: 'Wins', value: '25' },
  { key: 'Losses', value: '36' },
  { key: 'Ties', value: '26' },
  { key: 'Established', value: '2021-01-01' },
  { key: 'Team Captain', value: 'John Doe' }
]

export default async function TeamPage() {
  const session = await getServerSession()
  // let teamsWithMembers: Team[] = []

  if (session) {
    const teamsRes = await getTeamsByUserId()
    const teams = teamsRes.teams

    const invitedTeamsRes = await getInvitedTeams()
    const invitedTeams = invitedTeamsRes.teams

    // チームの詳細情報とメンバー情報を非同期で取得
    // if (teams) {
    //   teamsWithMembers = await Promise.all(
    //     teams.map(async (team) => {
    //       const [teamDetails, membersResponse] = await Promise.all([
    //         getTeamDetailsByTeamId(team.id),
    //         getMembersByTeamId(team.id)
    //       ])
    //       return {
    //         id: team.id,
    //         name: team.name,
    //         members: membersResponse.users ?? [],
    //         details: teamDetailsDummy
    //       }
    //     })
    //   )
    // }
    return (
      <main className="flex-1 p-8">
        <div>
          <h1 className="text-3xl font-bold">My Teams</h1>
          <TeamCards teams={teams} />
        </div>
        <div className="mt-8">
          <h1 className="text-3xl font-bold">Invited Teams</h1>
          <TeamCards teams={invitedTeams} />
        </div>
        <div className="fixed bottom-6 right-6 flex flex-col gap-4">
          <ViewInvitedTeamsButton />
          <CreateTeamsButton />
        </div>
      </main>
    )
  } else {
    return (
      <main className="flex-1 p-8">
        <div className="flex h-full flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">You are not logged in</h1>
          <p>Please login to view your teams</p>
        </div>
      </main>
    )
  }
}
