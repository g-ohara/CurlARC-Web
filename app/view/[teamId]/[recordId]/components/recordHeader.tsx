import React from 'react'
import { DeleteRecordButton } from './DeleteRecordButton'
import { RecordDetail } from '@/types/model'

type Props = {
  friendTeamName: string
  record: RecordDetail
}

export default function RecordHeader({ record, friendTeamName }: Props) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold">
        {friendTeamName} vs {record.enemy_team_name}
      </h1>
      <DeleteRecordButton recordId={record.id} />
    </div>
  )
}
