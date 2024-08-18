import { getRecordDetailsByRecordId } from '@/lib/api/record'
import ScoreBoard, { TeamScore } from './scoreBoard'
import StoneCoordinates from './stoneCoordinates'

export default async function RecordPage({ params }: { params: { recordId: string } }) {
  const res = await getRecordDetailsByRecordId(params.recordId)
  const recordDetails = res.record
  console.log(recordDetails.ends_data)

  const scoresData: TeamScore[] = [
    {
      team: 'Henderson',
      color: 'red',
      scores: ['', 0, 3, 0, 2, 6, 0, 0, 1, 2, 0],
      total: 14
    },
    {
      team: 'Bailey',
      color: 'yellow',
      scores: ['*', 0, 2, 0, 3, 0, 0, 0, 0, 0, 1],
      total: 6
    }
  ]

  return (
    <div className="w-full">
      <div className="m-5 ml-8 text-4xl font-bold">
        vs. {recordDetails.enemy_team_name}@{recordDetails.place}
      </div>
      <div className="flex flex-col items-center gap-6">
        <div>{String(recordDetails.date)}</div>
        <ScoreBoard scores={scoresData} />
        <StoneCoordinates />
      </div>
    </div>
  )
}
