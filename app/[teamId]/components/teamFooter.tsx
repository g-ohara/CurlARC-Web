"use client"

import LeaveTeamButton from './buttons/leaveTeamButton'
import DeleteTeamButton from './buttons/deleteTeamButton'

type TeamFooterProps = {
  teamName: string
  teamId: string
}

export const TeamFooter: React.FC<TeamFooterProps> = ({ teamName, teamId }: TeamFooterProps) => {

  return (
    <div className="flex w-full items-center">
      <div className="ml-auto flex gap-3">
        <div className="ml-auto flex gap-3">
          <LeaveTeamButton teamName={teamName} teamId={teamId} />
          <DeleteTeamButton teamName={teamName} teamId={teamId} />
        </div>
      </div>
    </div>
  )
}

