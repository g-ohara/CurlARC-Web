import { TeamMembers } from './teamMembers'
import { getMembersByTeamId } from '@/lib/api/team'
import InviteButton from './buttons/inviteButton'

export async function AsyncTeamMembers({ teamId }: { teamId: string }) {
  const { users: members } = await getMembersByTeamId(teamId)
  return <>
    <h4 className="mb-4 text-2xl font-medium">
      Members
      <InviteButton teamId={teamId} teamName="" />
    </h4>
    <TeamMembers className="col-span-3" members={members} />
  </>
}
