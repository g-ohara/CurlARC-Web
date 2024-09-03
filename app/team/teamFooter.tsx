import { CalendarIcon } from '@/components/icons'
import DeleteTeamButton from './buttons/deleteTeamButton'
import InviteButton from './buttons/inviteButton'
import LeaveTeamButton from './buttons/leaveTeamButton'

type TeamFooterProps = {
  lastGameDate: string
  teamName: string
  teamId: string
}

export const TeamFooter: React.FC<TeamFooterProps> = ({ lastGameDate, teamName, teamId }: TeamFooterProps) => (
  <div className="flex w-full items-center">
    <div className="flex text-sm text-muted-foreground">
      <CalendarIcon className="mr-1 inline h-4 w-4" /> Last game: {lastGameDate}
    </div>
    <div className="ml-auto flex gap-3">
      <InviteButton teamName={teamName} teamId={teamId} />
      <LeaveTeamButton teamName={teamName} teamId={teamId} />
      <DeleteTeamButton teamName={teamName} teamId={teamId} />
    </div>
  </div>
)
