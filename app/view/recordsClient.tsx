'use client'

import { useState } from 'react'
import TeamDropdownMenu from './teamDropdownMenu'
import RecordItem from './recordItem'
import { getRecordsByTeamId } from '@/lib/api/record'

type Record = {
  id: string
  team_id: string
  place: string
  date: Date
  ends_data: JSON
  is_public: boolean
}

type RecordsClientProps = {
  teams: {
    id: string
    name: string
  }[]
}

export default function RecordsClient({ teams }: RecordsClientProps) {
  const [selectedTeamId, setSelectedTeamId] = useState(teams[0]?.id || '')
  const [records, setRecords] = useState<Record[]>()

  const handleTeamChange = async (teamId: string) => {
    setSelectedTeamId(teamId)
    console.log('teamId:', teamId)
    const res = await getRecordsByTeamId(teamId)
    console.log('records:', res)
    setRecords(res.records)
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-start gap-6">
        <TeamDropdownMenu teams={teams} onSelect={handleTeamChange} />
      </div>
      <div className="grid grid-cols-1 gap-4">
        {records ? (
          records.map((record) => (
            <RecordItem
              key={record.id}
              recordId={record.id}
              result={'win'}
              enemyTeamName={'testing'}
              date={record.date.toString()}
            />
          ))
        ) : (
          <p>No records found for this team.</p>
        )}
      </div>
    </div>
  )
}
