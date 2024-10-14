"use client"

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
import { Switch } from '@/components/ui/switch';

import { Plus } from 'lucide-react'

type Props = {
  teamId: string
}

export const CreateRecordButton = ({ teamId }: Props) => {
  const [enemyTeamName, setEnemyTeamName] = useState('')
  const [place, setPlace] = useState('')
  const [date, setDate] = useState<Date>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isWin, setIsWin] = useState(true); // State to track if it's a win or not

  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    const req: createRecordRequest = {
      place: place,
      enemy_team_name: enemyTeamName,
      date: date ?? new Date(),
      ends_data: [],
      result: isWin ? 'WIN' : 'LOSS', // Add the win/loss result to the request
    }

    try {
      const res = await createRecord(teamId, req)
      setEnemyTeamName('')
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
          <Button
            variant="outline"
            size="icon"
            className="border-blue-600 text-blue-600 hover:bg-blue-100 hover:text-blue-700 h-7 w-7"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create a new record</DialogTitle>
            <DialogDescription>Fill out the form to create a new record.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="mb-2 grid gap-2">
                <Label htmlFor="enemy-team-name">Enemy Team Name</Label>
                <Input
                  id="enemy-team-name"
                  value={enemyTeamName}
                  onChange={(e) => setEnemyTeamName(e.target.value)}
                  placeholder="Enter the enemy team name"
                  required
                />
              </div>
              <div className="mb-4 grid gap-2">
                <Label htmlFor="win-loss-toggle">Result</Label>
                <div className="flex items-center gap-2">
                  <span>Loss</span>
                  <Switch
                    id="win-loss-toggle"
                    checked={isWin}
                    onCheckedChange={setIsWin}
                  />
                  <span>Win</span>
                </div>
              </div>
              <div className="mb-2 grid gap-2">
                <Label htmlFor="place">Place</Label>
                <Input
                  id="place"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  placeholder="Enter the place"
                  required
                />
              </div>
              <div className="mb-4 grid gap-2">
                <Label htmlFor="date">Date</Label>
                <DatePicker date={date} setDate={setDate} />
              </div>
            </div>
            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="ml-auto" disabled={loading}>
                {loading ? 'Creating...' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
