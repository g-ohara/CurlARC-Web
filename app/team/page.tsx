import React from 'react'
import { TeamCard } from './teamCard'
import { getMembersByTeamId, getTeamsByUserId, getTeamDetails } from '@/lib/api/team'
import { cookies } from 'next/headers'

export default async function TeamPage() {
  const cookieStore = cookies()
  const uuid = cookieStore.get('uuid')?.value
  let teamsWithMembers: Team[] = []

  if (uuid) {
    const teamsResponse = await getTeamsByUserId(uuid)
    const teams = teamsResponse.data

    // チームの詳細情報とメンバー情報を非同期で取得
    teamsWithMembers = await Promise.all(
      teams.map(async (team) => {
        const [teamDetails, membersResponse] = await Promise.all([getTeamDetails(team.id), getMembersByTeamId(team.id)])

        return {
          id: team.id,
          name: team.name,
          members: membersResponse.data.members,
          details: teamDetails.data.details
        }
      })
    )
  }

  if (teamsWithMembers.length === 0) {
    return (
      <main className="flex-1 p-8">
        <p>No teams found. Please join or create a team.</p>
      </main>
    )
  }

  return (
    <main className="flex-1 p-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teamsWithMembers.map((team) => (
          <TeamCard
            key={team.id}
            teamName={team.name}
            memberCount={team.members.length}
            score={{ red: 0, blue: 0 }}
            members={team.members.map((member) => ({
              name: member.name,
              email: member.email
            }))}
            statisticsData={[]}
            teamDetails={Object.entries(team)
              .filter(([key]) =>
                ['location', 'established', 'homeArena', 'sponsor', 'league', 'division'].includes(key)
              )
              .map(([key, value]) => ({
                key: key.charAt(0).toUpperCase() + key.slice(1),
                value: value?.toString() || 'N/A'
              }))}
            lastGameDate={'N/A'}
          />
        ))}
      </div>
    </main>
  )
}
