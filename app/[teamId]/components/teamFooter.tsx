"use client"

import { CalendarIcon } from '@/components/icons'
import InviteButton from './buttons/inviteButton'
import LeaveTeamButton from './buttons/leaveTeamButton'
import DeleteTeamButton from './buttons/deleteTeamButton'
import AcceptInvitationButton from './buttons/acceptInvitationButton'

type TeamFooterProps = {
  lastGameDate: string
  teamName: string
  teamId: string
  invited: boolean
}

export const TeamFooter: React.FC<TeamFooterProps> = ({ lastGameDate, teamName, teamId, invited }: TeamFooterProps) => {

  const Buttons = () => {
    if (invited) {
      return (
        <div className="ml-auto flex gap-3">
          <AcceptInvitationButton teamId={teamId} onAccept={() => { }} />
        </div>
      )
    }
    else {
      return (
        <div className="ml-auto flex gap-3">
          <InviteButton teamName={teamName} teamId={teamId} />
          <LeaveTeamButton teamName={teamName} teamId={teamId} />
          <DeleteTeamButton teamName={teamName} teamId={teamId} />
        </div>
      )
    }
  }

  return (
    <div className="flex w-full items-center">
      <div className="flex text-sm text-muted-foreground">
        <CalendarIcon className="mr-1 inline h-4 w-4" /> Last game: {lastGameDate}
      </div>
      <div className="ml-auto flex gap-3">
        <Buttons />
      </div>
    </div>
  )
}

