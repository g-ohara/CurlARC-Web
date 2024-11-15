import { getInvitedUsersByTeamId, getMembersByTeamId } from '@/lib/api/team'
import InviteButton from './buttons/inviteButton'
import { UserList } from './userList'

export async function AsyncTeamMembers({ teamId }: { teamId: string }) {
  const { users: members } = await getMembersByTeamId(teamId)
  const { users: invitedUsers} = await getInvitedUsersByTeamId(teamId)
  return(
  <div className='flex flex-col gap-10'>
    <div>
      <h3 className="mb-4 text-2xl font-medium">
        Members
        <InviteButton teamId={teamId} teamName="" />
      </h3>
      <UserList className="col-span-3" users={members}/>
    </div>
    <div>
      <h3 className="mb-4 text-2xl font-medium">
        Invited Users
      </h3>
      { 
      invitedUsers.length === 0 ? 
        <p className='pl-4 text-muted-foreground'>No invited users</p> : 
        <UserList className="col-span-3" users={invitedUsers}/>
      }
    </div>
  </div>  
  ) 
  
}
