import { TeamMembers } from './teamMembers'
import { getMembersByTeamId } from '@/lib/api/team'

export async function AsyncTeamMembers({ teamId }: { teamId: string }) {
  const { users: members } = await getMembersByTeamId(teamId)
  return <TeamMembers className="col-span-3" members={members} />
}
