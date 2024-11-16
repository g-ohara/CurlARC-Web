'use server'


import { getRecordDetailsByRecordId } from '@/lib/api/record'
import { getTeamDetailsByTeamId } from '@/lib/api/team'
import EditableRecordClient from './recordClient';


export default async function RecordPage({ params }: { params: { teamId: string; recordId: string } }) {
  const [recordRes, teamRes] = await Promise.all([
    getRecordDetailsByRecordId(params.recordId),
    getTeamDetailsByTeamId(params.teamId)
  ])

  return (
    <div className="md:h-[94%] w-[95%] md:w-[90%] mx-auto mt-4 md:my-auto content-center">
      <EditableRecordClient recordRes={recordRes} teamRes={teamRes} recordId={params.recordId} />
    </div>
  );
}
