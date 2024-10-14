import { createRecordRequest } from "@/types/request"
import { createRecord } from '@/lib/api/record';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DatePicker } from "./datePicker";

type Props = {
  teamId: string
}

export const CreateRecordButton = ({ teamId }: Props) => {
  const [place, setPlace] = useState('')
  const [date, setDate] = useState<Date>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    const req: createRecordRequest = {
      place: place,
      date: date ?? new Date(),
      ends_data: [],
    }

    try {
      const res = await createRecord(teamId, req)
      setPlace('')
      setDate(undefined)
      setSuccess('Record created successfully!')
      router.push(`/view/${teamId}/${res.record.id}`)
    } catch (error) {
      setError('Failed to create record. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="default">
            Create a new Record
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create a new record</DialogTitle>
            <DialogDescription>Fill out the form to create a new record.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="mb-4 grid gap-2">
                <Label htmlFor="team-name">Place</Label>
                <Input
                  id="place"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  placeholder="Enter the place"
                  required
                />
              </div>
              <div className="mb-4 grid gap-2">
                <Label htmlFor="team-name">Date</Label>
                <DatePicker date={date} setDate={setDate}/>
              </div>
            </div>
            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="ml-auto" disabled={loading}>
                {loading ? 'Creating...' : 'Create Team'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}