export default function RecordPage({ params }: { params: { recordId: string } }) {
  return <div>{params.recordId}</div>
}
