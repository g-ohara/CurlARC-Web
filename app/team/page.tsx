'use client'

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { TeamHeader } from './teamHeader'
import { TeamStatistics } from './teamStatistics'
import { TeamFooter } from './teamFooter'
import { TeamMembers } from './teamMembers'
import { TeamDetails } from './teamDetails'

export default function TeamPage() {
  const teamMembers = [
    { name: 'John Doe', role: 'Skip' },
    { name: 'Jane Smith', role: 'Vice-Skip' },
    { name: 'Bob Johnson', role: 'Lead' },
    { name: 'Sarah Lee', role: 'Second' },
    { name: 'Mike Brown', role: 'Lead' }
  ]

  const data = [
    { month: 'January', desktop: 186 },
    { month: 'February', desktop: 305 },
    { month: 'March', desktop: 237 },
    { month: 'April', desktop: 273 },
    { month: 'May', desktop: 209 },
    { month: 'June', desktop: 214 }
  ]

  const teamDetails = [
    { key: 'Location', value: 'Toronto, ON' },
    { key: 'Established', value: '2015' },
    { key: 'Home Arena', value: 'Toronto Curling Club' },
    { key: 'Sponsor', value: 'Frosty Inc' }
  ]

  return (
    <main className="flex-1 p-8">
      <div className="grid grid-cols-1 gap-6">
        <Card className="rounded-lg bg-white p-4 shadow-md">
          <CardHeader>
            <TeamHeader teamName="Team Frosty" memberCount={5} score={{ red: 8, blue: 10 }} />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <TeamMembers className="col-span-1" members={teamMembers} />
              <TeamStatistics className="col-span-1" data={data} />
              <TeamDetails data={teamDetails} />
            </div>
          </CardContent>
          <CardFooter>
            <TeamFooter lastGameDate="April 15, 2023" />
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
