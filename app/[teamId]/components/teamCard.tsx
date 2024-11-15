import React, { Suspense } from 'react'
import { TeamHeader } from './teamHeader'
import { AsyncTeamMembers } from './asyncTeamMembers'
import { TeamFooter } from './teamFooter'
import { LoadingPlaceholder } from './loadingPlaceholder'

import { getRecordsByTeamId } from '@/lib/api/record'
import { CreateRecordButton } from './buttons/createRecordButton'
import RecordItem from './recordItem'

type TeamCardProps = {
  teamId: string
  teamName: string
  lastGameDate: string
}

export async function TeamCard({ teamId, teamName, lastGameDate }: TeamCardProps) {
  const res = await getRecordsByTeamId(teamId)
  const records = res.record_indices
  return (
    <>
      <TeamHeader teamName={teamName} />
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div>
          <Suspense fallback={<LoadingPlaceholder />}>
          <AsyncTeamMembers teamId={teamId} />
          </Suspense>
        </div>
        <div>
          <h4 className="flex items-center text-2xl font-medium gap-4">
          <p>Records</p>
          <CreateRecordButton teamId={teamId} />
          </h4>
          <div className="max-h-[40vh] overflow-y-auto">
          {records ? (
            records.map((record) => (
            <RecordItem
              key={record.id}
              recordId={record.id}
              result={record.result}
              teamId={teamId}
              enemyTeamName={record.enemy_team_name}
              date={record.date.toString()}
            />
            ))
          ) : (
            <p>No records found for this team.</p>
          )}
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full p-4">
        <TeamFooter
          lastGameDate={lastGameDate}
          teamId={teamId}
          teamName={teamName}
        />
      </div>
    </>
  )
}
