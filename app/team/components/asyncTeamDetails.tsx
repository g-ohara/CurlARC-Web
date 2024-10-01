import { TeamDetails } from './teamDetails'
import { getTeamDetailsByTeamId } from '@/lib/api/team'

export async function AsyncTeamDetails({ teamId }: { teamId: string }) {
  const teamDetails = await getTeamDetailsByTeamId(teamId)
  const detailsData = [
    { key: 'Created', value: '2021-01-01' },
    { key: 'Team Captain', value: 'John Doe' }
    // その他の詳細情報をteamDetailsから生成
  ]
  return <TeamDetails className="col-span-3" data={detailsData} />
}
