import React, { Suspense } from 'react'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
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
}

export function TeamCard({ teamId, teamName, lastGameDate }: TeamCardProps) {
  return (
    <AccordionItem value={teamId}>
      <AccordionTrigger>
        <TeamHeader teamName={teamName} />
      </AccordionTrigger>
      <AccordionContent>
        <div className="grid grid-cols-10 gap-6">
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
        <TeamFooter lastGameDate={lastGameDate} teamId={teamId} teamName={teamName} />
      </AccordionContent>
    </AccordionItem>
  )
}
