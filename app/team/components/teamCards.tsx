'use server'

import { Team } from '@/types/model'
import { TeamCard } from './teamCard'
import { Accordion } from '@/components/ui/accordion'

type TeamCardsProps = {
  teams: Team[]
  invited: boolean
}

export default async function TeamCards({ teams, invited }: TeamCardsProps) {
  const message = 'No teams found.'
  return (
    <Accordion type="single" collapsible className="mt-3 ml-3">
      {teams.length == 0 ? <p>{message}</p> : teams.map((team) => (
        <TeamCard
          key={team.id}
          teamId={team.id}
          teamName={team.name}
          // memberCount={team.members.length}
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
          invited={invited}
        />
      ))}
    </Accordion>
  )
}
