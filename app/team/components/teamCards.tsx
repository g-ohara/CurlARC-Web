'use server'

import { Team } from '@/types/model'
import { TeamCard } from './teamCard'
import { Accordion } from '@/components/ui/accordion'

type TeamCardsProps = {
  teams: Team[]
}

export default async function TeamCards({ teams }: TeamCardsProps) {
  return (
    <Accordion type="single" collapsible className="grid grid-cols-1 gap-6">
      {teams.map((team) => (
        <TeamCard
          key={team.id}
          teamId={team.id}
          teamName={team.name}
          // memberCount={team.members.length}
          score={{ red: 0, blue: 0 }}
          // members={team.members.map((member) => ({
          //   name: member.name,
          //   email: member.email
          // }))}
          // statisticsData={[
          //   { key: 'Wins', value: 25 },
          //   { key: 'Losses', value: 36 },
          //   { key: 'Ties', value: 26 },
          //   { key: 'Percentage', value: 6 },
          //   { key: 'Points', value: 12 },
          //   { key: 'Points Against', value: 52 }
          // ]}
          // teamDetails={team.details}
          lastGameDate={'N/A'}
        />
      ))}
    </Accordion>
  )
}
