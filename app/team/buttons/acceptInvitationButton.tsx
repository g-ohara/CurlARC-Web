import { Button } from '@/components/ui/button'
import { acceptInvitation } from '@/lib/api/team'
import { revalidateByTag } from '../serverActions'

type AcceptInvitationButtonProps = {
  teamId: string
}

export default function AcceptInvitationButton({ teamId }: AcceptInvitationButtonProps) {
  const handleAcceptInvitation = async () => {
    try {
      console.log('Accepting invitation...')
      await acceptInvitation(teamId)
      revalidateByTag('getTeamsByUserId')
      revalidateByTag('getInvitedTeams')
    } catch (error) {
      console.error('Error accepting invitation:', error)
    }
  }
  return (
    <Button variant="outline" size="default" onClick={handleAcceptInvitation}>
      Accept Invitation
    </Button>
  )
}
