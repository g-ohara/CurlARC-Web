'use server'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getTeamsByUserId } from '@/lib/api/team'
import RecordsClient from './components/recordsClient'
import { getServerSession } from 'next-auth'

export default async function View() {
  const session = await getServerSession()
  let teams: { id: string; name: string }[] = []
  if (session) {
    const res = await getTeamsByUserId()
    teams = res.teams
  }

  return (
    <main className="flex-1 p-8">
      <div className="grid grid-cols-1 gap-6">
        <Card className="rounded-lg bg-white shadow-md">
          <CardHeader>
            <h2 className="text-2xl font-bold">Records</h2>
          </CardHeader>
          <CardContent>
            {teams ? (
              <RecordsClient teams={teams} />
            ) : (
              <p>You have not joined to any team. Please create or join a team.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
