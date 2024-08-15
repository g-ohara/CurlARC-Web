import { Button } from '@/components/ui/button'
import { acceptInvitation } from '@/lib/api/team'
import { revalidateByTag } from '../serverActions'

type AcceptInvitationButtonProps = {
  teamId: string
  onAccept: () => void
}

export default function AcceptInvitationButton({ teamId, onAccept }: AcceptInvitationButtonProps) {
  const handleAcceptInvitation = async () => {
    try {
      console.log('Accepting invitation...')
      await acceptInvitation(teamId)
      revalidateByTag('getTeamsByUserId')
      revalidateByTag('getInvitedTeams')
      onAccept()
    } catch (error) {
      console.error('Error accepting invitation:', error)
    }
  }
  return (
    <Button variant="default" size="default" onClick={handleAcceptInvitation}>
      Accept
    </Button>
  )
}
