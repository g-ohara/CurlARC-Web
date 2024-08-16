'use server'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import TeamDropdownMenu from './teamDropdownMenu'
import RecordItem from './recordItem'

export default async function View() {
  return (
    <main className="flex-1 p-8">
      <div className="grid grid-cols-1 gap-6">
        <Card className="rounded-lg bg-white shadow-md">
          <CardHeader>
            <div className="flex items-center justify-start gap-6">
              <h2 className="text-2xl font-bold">Records</h2>
              <TeamDropdownMenu />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <RecordItem result="win" teamName="Team Frosty" date="2021-10-01" />
              <RecordItem result="loss" teamName="Team Snowflake" date="2021-10-02" />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
