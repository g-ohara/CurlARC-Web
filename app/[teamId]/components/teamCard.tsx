import React, { Suspense } from 'react'
import { TeamHeader } from './teamHeader'
import { AsyncTeamMembers } from './asyncTeamMembers'
import { AsyncTeamStatistics } from './asyncTeamStatistics'
import { AsyncTeamDetails } from './asyncTeamDetails'
import { TeamFooter } from './teamFooter'
import { LoadingPlaceholder } from './loadingPlaceholder'

type TeamCardProps = {
  teamId: string
  teamName: string
  lastGameDate: string
  invited: boolean
}

export function TeamCard({ teamId, teamName, lastGameDate, invited }: TeamCardProps) {
  return (
    <>
      <TeamHeader teamName={teamName} />
      <div className="grid grid-cols-10 gap-6 mt-8">
        <div className="col-span-3">
          <Suspense fallback={<LoadingPlaceholder />}>
            <AsyncTeamMembers teamId={teamId} />
          </Suspense>
        </div>
        <div className="col-span-4">
          <Suspense fallback={<LoadingPlaceholder />}>
            <AsyncTeamStatistics teamId={teamId} />
          </Suspense>
        </div>
        <div className="col-span-3">
          <Suspense fallback={<LoadingPlaceholder />}>
            <AsyncTeamDetails teamId={teamId} />
          </Suspense>
        </div>
      </div>
      <TeamFooter lastGameDate={lastGameDate} teamId={teamId} teamName={teamName} invited={invited} />
    </>
  )
}
