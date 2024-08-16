'use server'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getTeamsByUserId } from '@/lib/api/team'
import RecordsClient from './recordsClient'

export default async function View() {
  const teamsRes = await getTeamsByUserId()

  return (
    <main className="flex-1 p-8">
      <div className="grid grid-cols-1 gap-6">
        <Card className="rounded-lg bg-white shadow-md">
          <CardHeader>
            <h2 className="text-2xl font-bold">Records</h2>
          </CardHeader>
          <CardContent>
            <RecordsClient teams={teamsRes.teams} />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
