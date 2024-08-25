import { getRecordDetailsByRecordId } from '@/lib/api/record'
import ScoreBoard from './components/scoreBoard'
import StoneCoordinates from './components/stoneCoordinates'
import { DeleteRecordButton } from './components/DeleteRecordButton'
import { RecordDetail } from '@/lib/api/types/model'

export function extractTeamsScoreData(record: RecordDetail): TeamScore {
  const myTeamName = 'My Team' // 自チーム名を適切に設定してください
  const opponentTeamName = record.enemy_team_name

  const myTeamScores: (number | string)[] = ['']
  const opponentTeamScores: (number | string)[] = ['']
  let myTeamTotal = 0
  let opponentTeamTotal = 0

  record.ends_data.forEach((end) => {
    if (end.score >= 0) {
      myTeamScores.push(end.score)
      opponentTeamScores.push(0)
      myTeamTotal += end.score
    } else {
      myTeamScores.push(0)
      opponentTeamScores.push(Math.abs(end.score))
      opponentTeamTotal += Math.abs(end.score)
    }
  })

  // スコアが10エンドに満たない場合、0で埋める
  while (myTeamScores.length < 11) {
    myTeamScores.push(0)
    opponentTeamScores.push(0)
  }

  return {
    friend: {
      team: myTeamName,
      color: 'red',
      scores: myTeamScores,
      total: myTeamTotal
    },
    enemy: {
      team: opponentTeamName,
      color: 'yellow',
      scores: opponentTeamScores,
      total: opponentTeamTotal
    }
  }
}

export default async function RecordPage({ params }: { params: { teamName: string; recordId: string } }) {
  console.log(params)
  const res = await getRecordDetailsByRecordId(params.recordId)
  const recordDetails = res.record
  let teamScoreData: TeamScore = {
    friend: {
      team: 'My Team',
      color: 'red',
      scores: [],
      total: 0
    },
    enemy: {
      team: recordDetails.enemy_team_name,
      color: 'yellow',
      scores: [],
      total: 0
    }
  }

  if (recordDetails.ends_data) {
    teamScoreData = extractTeamsScoreData(recordDetails)
    console.log('extracted score:', teamScoreData)
  }

  return (
    <div className="w-full">
      <div className="flex items-center">
        <div className="m-5 ml-8 w-4/5 text-4xl font-bold">
          {params.teamName} vs. {recordDetails.enemy_team_name} @{recordDetails.place}
        </div>
        <DeleteRecordButton recordId={params.recordId} className="m-5" />
      </div>

      <div className="flex flex-col items-center gap-6">
        {teamScoreData ? (
          <>
            <div>{String(recordDetails.date)}</div>
            <ScoreBoard friendScore={teamScoreData.friend} enemyScore={teamScoreData.enemy} />
            <StoneCoordinates />
          </>
        ) : (
          <div>試合データがありません</div>
        )}
      </div>
    </div>
  )
}
