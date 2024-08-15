import { CalendarIcon } from '@/components/icons'
import DeleteTeamButton from './buttons/deleteTeamButton'
import InviteButton from './buttons/inviteButton'

interface TeamFooterProps {
  lastGameDate: string
  teamName: string
  teamId: string
}

export const TeamFooter: React.FC<TeamFooterProps> = ({ lastGameDate, teamName, teamId }: TeamFooterProps) => (
  <div className="flex items-center justify-between gap-6">
    <div className="text-sm text-muted-foreground">
      <CalendarIcon className="mr-1 inline h-4 w-4" /> Last game: {lastGameDate}
    </div>
    <InviteButton teamName={teamName} teamId={teamId} />
    <DeleteTeamButton teamName={teamName} teamId={teamId} />
  </div>
)
