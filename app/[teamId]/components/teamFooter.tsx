"use client"

import { CalendarIcon } from '@/components/icons'
import LeaveTeamButton from './buttons/leaveTeamButton'
import DeleteTeamButton from './buttons/deleteTeamButton'

type TeamFooterProps = {
  lastGameDate: string
  teamName: string
  teamId: string
  invited: boolean
}

export const TeamFooter: React.FC<TeamFooterProps> = ({ lastGameDate, teamName, teamId, invited }: TeamFooterProps) => {

  const Buttons = () => {
    return (
      <div className="ml-auto flex gap-3">
        <LeaveTeamButton teamName={teamName} teamId={teamId} />
        <DeleteTeamButton teamName={teamName} teamId={teamId} />
      </div>
    )
  }

  return (
    <div className="flex w-full items-center mt-4">
      <div className="flex text-sm text-muted-foreground">
        <CalendarIcon className="mr-1 inline h-4 w-4" /> Last game: {lastGameDate}
      </div>
      <div className="ml-auto flex gap-3">
        <Buttons />
      </div>
    </div>
  )
}

