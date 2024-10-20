import { Check } from "lucide-react"
import { acceptInvitation } from '@/lib/api/team'
import { revalidateByTag } from '../[teamId]/serverActions'

type AcceptInvitationButtonProps = {
  teamId: string
}

export default function AcceptInvitationButton({ teamId }: AcceptInvitationButtonProps) {
  const handleAcceptInvitation = async () => {
    try {
      await acceptInvitation(teamId)
      revalidateByTag('getTeamsByUserId')
      revalidateByTag('getInvitedTeams')
    } catch (error) {
      console.error('Error accepting invitation:', error)
    }
  }
  return (
    <div className="hover:bg-green-100">
      <Check
        onClick={handleAcceptInvitation}
        className="h-6 w-6 text-green-500 cursor-pointer"
      />
    </div>
  )
}
