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
import { Textarea } from '@/components/ui/textarea'

export default function InviteButton() {
  const [teamMembers, setTeamMembers] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

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
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const users = teamMembers.split(',').map((email) => email.trim())
      console.log('Inviting users:', users)
      setTeamMembers('')
      // 成功メッセージ
      setSuccess('Team created successfully!')
      // フォームのリセット
    } catch (error) {
      // エラーメッセージ
      setError('Failed to create team. Please try again.\n' + error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen} defaultOpen={false}>
        <DialogTrigger asChild>
          <Button variant="outline" size="default" className="text-red">
            Invite Users
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invite Users to Your Team</DialogTitle>
            <DialogDescription>Fill out the form to create a new curling team.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="team-logo">Team Logo (Comming Soon....)</Label>
                {/* <Input id="team-logo" type="file" /> */}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="team-members">Team Members</Label>
                <Textarea
                  id="team-members"
                  value={teamMembers}
                  onChange={(e) => setTeamMembers(e.target.value)}
                  placeholder="Enter email addresses separated by commas"
                  required
                />
              </div>
            </div>
            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}
            <DialogFooter className="mt-3">
              <Button type="button" variant="ghost">
                Cancel
              </Button>
              <Button type="submit" className="ml-auto" disabled={loading}>
                {loading ? 'Inviting...' : 'Invite'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
