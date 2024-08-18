import { getRecordDetailsByRecordId } from '@/lib/api/record'

export default async function RecordPage({ params }: { params: { recordId: string } }) {
  const res = await getRecordDetailsByRecordId(params.recordId)
  const recordDetails = res.record

  return (
    <div>
      <div>{recordDetails.id}</div>
      <div>{recordDetails.result}</div>
      <div>{recordDetails.enemy_team_name}</div>
      <div>{recordDetails.place}</div>
    </div>
  )
}
