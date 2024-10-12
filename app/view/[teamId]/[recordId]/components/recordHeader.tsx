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

export default function RecordHeader({ record, friendTeamName, toggleEditMode, isEditMode, handleCancel, handleSave }: Props) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold">
        {friendTeamName} vs {record.enemy_team_name}
      </h1>
      <div className="flex items-center space-x-4 ml-auto">
        <Button onClick={toggleEditMode}>
          {isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
        </Button>
        {isEditMode && (
          <>
            <Button onClick={handleSave} className="mr-2">Save Changes</Button>
            <Button onClick={handleCancel} variant="outline">Cancel</Button>
          </>
        )}
        <DeleteRecordButton recordId={record.id} />
      </div>
    </div>
  )
}
