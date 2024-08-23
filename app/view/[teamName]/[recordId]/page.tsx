import { getRecordDetailsByRecordId } from '@/lib/api/record'
import ScoreBoard, { TeamScore } from './scoreBoard'
import StoneCoordinates from './stoneCoordinates'
import { DeleteRecordButton } from './components/DeleteRecordButton'

export default async function RecordPage({ params }: { params: { teamName: string; recordId: string } }) {
  console.log(params)
  const res = await getRecordDetailsByRecordId(params.recordId)
  const recordDetails = res.record
  if (recordDetails.ends_data) {
    console.log(recordDetails.ends_data[0].shots[0])
  }

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
      <div className="flex items-center">
        <div className="m-5 ml-8 w-4/5 text-4xl font-bold">
          {params.teamName} vs. {recordDetails.enemy_team_name} @{recordDetails.place}
        </div>
        <DeleteRecordButton recordId={params.recordId} className="m-5" />
      </div>

      <div className="flex flex-col items-center gap-6">
        <div>{String(recordDetails.date)}</div>
        <ScoreBoard scores={scoresData} />
        <StoneCoordinates />
      </div>
    </div>
  )
}
