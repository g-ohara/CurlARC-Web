import { TeamStatistics } from './teamStatistics'
import { getTeamDetailsByTeamId } from '@/lib/api/team'

export async function AsyncTeamStatistics({ teamId }: { teamId: string }) {
  // const teamDetails = await getTeam
  const statisticsData = [
    { key: 'Wins', value: 30 },
    { key: 'Losses', value: 15 },
    { key: 'Ties', value: 10 },
    { key: 'Win Rate', value: 66.7 }
    // その他の統計情報をteamDetailsから生成
  ]
  return <TeamStatistics className="col-span-4" data={statisticsData} />
}
