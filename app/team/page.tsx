'use server'

import React from 'react'
import { getMembersByTeamId, getTeamDetailsByTeamId, getTeamsByUserId } from '@/lib/api/team'
import CreateTeamsButton from './components/buttons/createTeamsButton'
import ViewInvitedTeamsButton from './components/buttons/viewInvitedTeamsButton'
import { Team } from '@/types/model'
import { getServerSession } from 'next-auth'
import { TeamCard } from './components/teamCard'

const teamDetailsDummy = [
  { key: 'Wins', value: '25' },
  { key: 'Losses', value: '36' },
  { key: 'Ties', value: '26' },
  { key: 'Established', value: '2021-01-01' },
  { key: 'Team Captain', value: 'John Doe' }
]

export default async function TeamPage() {
  const session = await getServerSession()
  let teamsWithMembers: Team[] = []

  if (session) {
    const res = await getTeamsByUserId()
    const teams = res.teams

    // チームの詳細情報とメンバー情報を非同期で取得
    if (teams) {
      teamsWithMembers = await Promise.all(
        teams.map(async (team) => {
          const [teamDetails, membersResponse] = await Promise.all([
            getTeamDetailsByTeamId(team.id),
            getMembersByTeamId(team.id)
          ])
          return {
            id: team.id,
            name: team.name,
            members: membersResponse.users ?? [],
            details: teamDetailsDummy
          }
        })
      )
    }
  }

  return (
    <main className="flex-1 p-8">
      <div className="grid grid-cols-1 gap-6">
        {teamsWithMembers.length > 0 ? (
          teamsWithMembers.map((team) => (
            <TeamCard
              key={team.id}
              teamId={team.id}
              teamName={team.name}
              memberCount={team.members.length}
              score={{ red: 0, blue: 0 }}
              members={team.members.map((member) => ({
                name: member.name,
                email: member.email
              }))}
              statisticsData={[
                { key: 'Wins', value: 25 },
                { key: 'Losses', value: 36 },
                { key: 'Ties', value: 26 },
                { key: 'Percentage', value: 6 },
                { key: 'Points', value: 12 },
                { key: 'Points Against', value: 52 }
              ]}
              teamDetails={team.details}
              lastGameDate={'N/A'}
            />
          ))
        ) : (
          <p>No teams found. Please join or create a team.</p>
        )}
      </div>
      <div className="fixed bottom-6 right-6 flex flex-col gap-4">
        <ViewInvitedTeamsButton />
        <CreateTeamsButton />
      </div>
    </main>
  )
}
