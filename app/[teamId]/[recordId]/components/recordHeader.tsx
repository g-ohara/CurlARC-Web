import React from 'react'
import { RecordDetail } from '@/types/model'

type Props = {
  friendTeamName: string
  record: RecordDetail
}

export default function RecordHeader({ record, friendTeamName }: Props) {
  return (
    <div className="flex-col justify-between items-center">
      <h1 className="text-3xl font-semibold">
        {friendTeamName} vs {record.enemy_team_name} @ {record.place}
      </h1>
    </div>
  )
}
