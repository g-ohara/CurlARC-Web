import { getRecordDetailsByRecordId } from '@/lib/api/record'
import ScoreBoard from './components/scoreBoard'
import StoneCoordinates from './components/stoneCoordinates'
import { DeleteRecordButton } from './components/DeleteRecordButton'
import { extractTeamsScoreData } from '@/utils/func/score'

export default async function RecordPage({ params }: { params: { teamName: string; recordId: string } }) {
  console.log(params)
  const res = await getRecordDetailsByRecordId(params.recordId)
  const recordDetails = res.record
  const teamScoreData = extractTeamsScoreData(recordDetails)
  teamScoreData.friend.team = params.teamName // recordDetailsには自チーム名が含まれていないため、ここで代入

  return (
    <div className="w-full">
      <div className="flex items-center">
        <div className="m-5 ml-8 w-4/5 text-4xl font-bold">
          {params.teamName} vs. {recordDetails.enemy_team_name} @ {recordDetails.place}
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
