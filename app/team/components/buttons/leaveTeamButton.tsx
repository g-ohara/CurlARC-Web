'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { revalidateByTag } from '../../serverActions'
import { removeTeamMembers } from '@/lib/api/team'
import { useSession } from 'next-auth/react'

interface LeaveTeamButtonProps {
  teamName: string
  teamId: string
}

export default function LeaveTeamButton({ teamName, teamId }: LeaveTeamButtonProps) {
  const [confirmText, setConfirmText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const {data: session} = useSession()
  const user = session?.user

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setIsOpen(false)
        setSuccess(null)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [success])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (confirmText !== `sudo leave ${teamName}`) {
      setError('Confirmation text does not match. Please try again.')
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      if (user) {
        await removeTeamMembers(teamId, user.id)
        revalidateByTag('getTeamsByUserId')
        setSuccess('You left successfully!')
        setConfirmText('')
      } else {
        throw new Error('You are not logged in.')
      }
    } catch (error) {
      setError('Failed to leave team. Please try again.\n' + error)
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
            size="default"
            className="border-red-600 text-red-600 hover:bg-red-100 hover:text-red-700"
          >
            Leave Team
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-red-200 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-800">Leave Team</DialogTitle>
            <DialogDescription className="text-red-400">
              This action cannot be undone. <br></br>
              Please type "<code>sudo leave {teamName}</code>" to confirm.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="mb-4 grid gap-2">
                <Label htmlFor="confirm-text" className="text-red-800">
                  Confirmation
                </Label>
                <Input
                  id="confirm-text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder={`sudo leave ${teamName}`}
                  required
                />
              </div>
            </div>
            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}
            <DialogFooter>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
              <Button type="submit" className="ml-auto bg-red-600 hover:bg-red-700" disabled={loading}>
                {loading ? 'Leaving...' : 'Leave Team'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
