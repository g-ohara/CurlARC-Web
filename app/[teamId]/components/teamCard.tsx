import React, { Suspense } from 'react'
import { TeamHeader } from './teamHeader'
import { AsyncTeamMembers } from './asyncTeamMembers'
import { AsyncTeamStatistics } from './asyncTeamStatistics'
import { AsyncTeamDetails } from './asyncTeamDetails'
import { TeamFooter } from './teamFooter'
import { LoadingPlaceholder } from './loadingPlaceholder'

import { useState } from 'react'
import RecordItem from '@/app/view/components/recordItem'
import { getRecordsByTeamId } from '@/lib/api/record'
import { RecordIndex } from '@/types/model'

type TeamCardProps = {
  teamId: string
  teamName: string
  lastGameDate: string
  invited: boolean
}

export async function TeamCard({ teamId, teamName, lastGameDate, invited }: TeamCardProps) {
  const res = await getRecordsByTeamId(teamId)
  const records = res.record_indices
  return (
    <>
      <TeamHeader teamName={teamName} />
      <div className="grid grid-cols-2 gap-6 mt-8">
        <div>
          <Suspense fallback={<LoadingPlaceholder />}>
            <AsyncTeamMembers teamId={teamId} />
          </Suspense>
          <Suspense fallback={<LoadingPlaceholder />}>
            <AsyncTeamDetails teamId={teamId} />
          </Suspense>
        </div>
        <div>
          <h4 className="text-2xl font-medium">Records</h4>
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
      <TeamFooter
        lastGameDate={lastGameDate}
        teamId={teamId}
        teamName={teamName}
        invited={invited}
      />
    </>
  )
}
