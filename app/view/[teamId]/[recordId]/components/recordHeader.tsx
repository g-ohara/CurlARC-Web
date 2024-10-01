import React from 'react'
import { DeleteRecordButton } from './DeleteRecordButton'

type RecordHeaderProps = {
  friendTeamName: string
  enemyTeamName: string
  recordId: string
}

export default function RecordHeader({ friendTeamName, enemyTeamName, recordId }: RecordHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold">
        {friendTeamName} vs {enemyTeamName}
      </h1>
      <DeleteRecordButton recordId={recordId} />
    </div>
  )
}
