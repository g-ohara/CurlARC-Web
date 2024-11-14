import React from 'react'
import { DeleteRecordButton } from './DeleteRecordButton'
import { RecordDetail } from '@/types/model'

type Props = {
  record: RecordDetail
}

export default function RecordFooter({ record }: Props) {
  return (
    <div className="flex justify-end ites-center mt-4">
      <DeleteRecordButton recordId={record.id} />
    </div>
  )
}
