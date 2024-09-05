import { getRecordDetailsByRecordId } from '@/lib/api/record'
import ScoreBoard from './components/scoreBoard'
import { DeleteRecordButton } from './components/DeleteRecordButton'
import { extractTeamsScoreData } from '@/utils/func/score'
import { SheetContainer } from './components/sheetContainer'
import { Coordinate } from '@/app/@types/model'
import { ShotSelector } from './components/shotSelector'

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
<div className="w-full h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {params.teamName} vs. {recordDetails.enemy_team_name}
          </h1>
          <DeleteRecordButton recordId={params.recordId} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" />
        </div>

        <div className="flex flex-row space-x-8">
          <div className="w-3/5 space-y-6">

            <div className="bg-white rounded-lg shadow-md p-6">
              <ScoreBoard friendScore={teamScoreData.friend} enemyScore={teamScoreData.enemy} />
              <ShotSelector/>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-xl font-semibold text-gray-700 mb-2">Match Details</p>
              <p className="text-gray-600">Date: {String(recordDetails.date)}</p>
              <p className="text-gray-600">Venue: {recordDetails.place}</p>
            </div>

          </div>

          <div className="w-2/5">
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-xl font-semibold text-gray-700 mb-4">Stones</p>
              <SheetContainer 
                friendStones={friendStonesDummy} 
                enemyStones={enemyStonesDummy} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
