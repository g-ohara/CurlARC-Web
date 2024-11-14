import React from 'react'
import { DeleteRecordButton } from './DeleteRecordButton'
import { RecordDetail } from '@/types/model'
import { Button } from '@/components/ui/button'

type Props = {
  friendTeamName: string
  record: RecordDetail
  toggleEditMode: () => void
  isEditMode: boolean
  handleSave: () => void
  handleCancel: () => void
}

export default function RecordHeader({ record, friendTeamName, toggleEditMode, isEditMode, handleSave }: Props) {
  return (
    <div className="flex-col justify-between items-center">
      <h1 className="text-3xl font-semibold">
        {friendTeamName} vs {record.enemy_team_name} @ {record.place}
      </h1>
      <div className="flex items-center space-x-4 justify-end mt-2">
        <Button onClick={toggleEditMode}>
          {isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
        </Button>
        {isEditMode && (
          <Button onClick={handleSave} className="mr-2">Save Changes</Button>
        )}
        <DeleteRecordButton recordId={record.id} />
      </div>
    </div>
  )
}
