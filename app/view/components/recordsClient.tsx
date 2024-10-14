'use client'

import { useState } from 'react'
import TeamDropdownMenu from './teamDropdownMenu'
import RecordItem from './recordItem'
import { getRecordsByTeamId } from '@/lib/api/record'
import { RecordIndex } from '@/types/model'
import { Button } from '@/components/ui/button'
import { CreateRecordButton } from './createRecordButton'
import { DatePicker } from './datePicker'

type Props = {
  teams: {
    id: string
    name: string
  }[]
}

export default function RecordsClient({ teams }: Props) {
  const [selectedTeamId, setSelectedTeamId] = useState<string>('')
  const [records, setRecords] = useState<RecordIndex[]>()

  const handleTeamChange = async (teamId: string) => {
    setSelectedTeamId(teamId)
    const res = await getRecordsByTeamId(teamId)
    setRecords(res.record_indices)
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-start gap-6">
        <TeamDropdownMenu teams={teams} onSelect={handleTeamChange} />
      </div>
      <div className="grid grid-cols-1 gap-4">
        {records ? (
        <>
        {records.map((record) => (
          <RecordItem
            key={record.id}
            recordId={record.id}
            result={record.result}
            teamId={selectedTeamId}
            enemyTeamName={record.enemy_team_name}
            date={record.date.toString()}
          />
        ))}
        <CreateRecordButton teamId={selectedTeamId} />
        </>
        ) : (
          <p>No records found for this team.</p>
        )}
      </div>
    </div>
  )
}
