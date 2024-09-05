import { getRecordDetailsByRecordId } from '@/lib/api/record'
import ScoreBoard from './components/scoreBoard'
import StoneCoordinates from './components/stoneCoordinates'
import { DeleteRecordButton } from './components/DeleteRecordButton'
import { extractTeamsScoreData } from '@/utils/func/score'
import { SheetContainer } from './components/sheetContainer'
import { Coordinate } from '@/app/@types/model'

export default async function RecordPage({ params }: { params: { teamName: string; recordId: string } }) {
  console.log(params)
  const res = await getRecordDetailsByRecordId(params.recordId)
  const recordDetails = res.record
  const teamScoreData = extractTeamsScoreData(recordDetails)
  teamScoreData.friend.team = params.teamName // recordDetailsには自チーム名が含まれていないため、ここで代入
  const friendStonesDummy : Coordinate[] = [
    { index: 0, r: 100, theta: 60 },
    { index: 1, r: 150, theta: 10 },
    { index: 2, r: 20, theta: 20 },
    { index: 3, r: 500, theta: 30 },
    { index: 4, r: 300, theta: 40 },
    { index: 5, r: 400, theta: 50 },
  ]
  const enemyStonesDummy : Coordinate[] = [
    { index: 0, r: 200, theta: 60 },
    { index: 1, r: 350, theta: 10 },
    { index: 2, r: 40, theta: 20 },
    { index: 3, r: 600, theta: 30 },
    { index: 4, r: 400, theta: 40 },
    { index: 5, r: 300, theta: 50 },
  ]

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
            <SheetContainer 
              friendStones={friendStonesDummy} enemyStones={enemyStonesDummy} 
            />
          </>
        ) : (
          <div>試合データがありません</div>
        )}
      </div>
    </div>
  )
}
