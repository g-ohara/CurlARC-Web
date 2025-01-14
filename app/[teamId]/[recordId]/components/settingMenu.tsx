import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiClient } from '@/utils/api/api'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Settings } from 'lucide-react';

type Props = {
  isEditMode: boolean
  toggleEditMode: () => void
  recordId: string
}

export default function SettingMenu({
  isEditMode,
  toggleEditMode,
  recordId,
}: Props
) {

  const router = useRouter();
  const [open, setOpen] = useState(false);

  const deleteRecord = async (recordId: string) => {
    await apiClient.destroy<any>(`/auth/records/${recordId}`);
    setOpen(false);
    router.back();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Settings />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <div className="flex items-center">
              <Switch checked={isEditMode} onCheckedChange={toggleEditMode} />
              <label className="ml-2">Edit Mode</label>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete Record</Button>
            </DialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
  );
}
