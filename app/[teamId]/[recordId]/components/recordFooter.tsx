import React from 'react'
import { DeleteRecordButton } from './DeleteRecordButton'
import { RecordDetail } from '@/types/model'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'

type Props = {
  record: RecordDetail
  toggleEditMode: () => void
  isEditMode: boolean
  handleSave: () => void
}

export default function RecordFooter({ record, toggleEditMode, isEditMode, handleSave }: Props) {
  return (
    <div className="flex justify-end ites-center space-x-4 mt-4">
      <div className="flex items-center">
        <Switch checked={isEditMode} onCheckedChange={toggleEditMode} />
        <label className="ml-2">Edit Mode</label>
      </div>
      <DeleteRecordButton recordId={record.id} />
    </div>
  )
}
