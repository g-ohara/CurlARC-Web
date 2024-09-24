// components/TeamCard.tsx
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { TeamHeader } from './teamHeader'
import { TeamStatistics } from './teamStatistics'
import { TeamFooter } from './teamFooter'
import { TeamMembers } from './teamMembers'
import { TeamDetails } from './teamDetails'

type TeamCardProps = {
  teamId: string
  teamName: string
  memberCount: number
  score: { red: number; blue: number }
  members: Array<{ name: string; email: string }>
  statisticsData: Array<{ key: string; value: number }>
  teamDetails: Array<{ key: string; value: string }>
  lastGameDate: string
}

export function TeamCard({
  teamId,
  teamName,
  memberCount,
  score,
  members,
  statisticsData,
  teamDetails,
  lastGameDate
}: TeamCardProps) {
  return (
    <Card className="rounded-lg bg-white p-4 shadow-md">
      <CardHeader>
        <TeamHeader teamName={teamName} memberCount={memberCount} score={score} />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-10 gap-6">
          <TeamMembers className="col-span-3" members={members} />
          <TeamStatistics className="col-span-4" data={statisticsData} />
          <TeamDetails className="col-span-3" data={teamDetails} />
        </div>
      </CardContent>
      <CardFooter>
        <TeamFooter lastGameDate={lastGameDate} teamId={teamId} teamName={teamName} />
      </CardFooter>
    </Card>
  )
}
