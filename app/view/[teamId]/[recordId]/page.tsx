'use server'


import { getRecordDetailsByRecordId } from '@/lib/api/record'
import { getTeamDetailsByTeamId } from '@/lib/api/team'
import RecordClient from './recordClient';


export default async function RecordPage({ params }: { params: { teamId: string; recordId: string } }) {
  const [recordRes, teamRes] = await Promise.all([
    getRecordDetailsByRecordId(params.recordId),
    getTeamDetailsByTeamId(params.teamId)
  ])

  return <RecordClient recordRes={recordRes} teamRes={teamRes} recordId={params.recordId}/>
}