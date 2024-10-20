'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { apiClient } from '@/utils/api/api'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

type Props = {
  recordId: string
  className?: string
}

export const DeleteRecordButton = ({ recordId, className }: Props) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const deleteRecord = async (recordId: string) => {
    await apiClient.destroy<any>(`/auth/records/${recordId}`)
    setOpen(false)
    router.back()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className={className}>Delete Record</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this record?</DialogTitle>
          <DialogDescription>This action cannot be undone. This will permanently delete the record.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => deleteRecord(recordId)}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
