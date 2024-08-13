'use client'

import { useState } from 'react'
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
import { apiClient } from '@/utils/api/api'

export default function CreateTeamsButton() {
  const [teamName, setTeamName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // APIエンドポイントは適切に設定してください
      const response = await apiClient.post('/auth/teams/', {
        name: teamName
      })

      // 成功メッセージ
      setSuccess('Team created successfully!')
      // フォームのリセット
      setTeamName('')
    } catch (error) {
      // エラーメッセージ
      setError('Failed to create team. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Dialog defaultOpen={false}>
        <DialogTrigger asChild>
          <Button variant="outline" size="default">
            Create Team
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create a New Team</DialogTitle>
            <DialogDescription>Fill out the form to create a new curling team.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="mb-4 grid gap-2">
                <Label htmlFor="team-name">Team Name</Label>
                <Input
                  id="team-name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter team name"
                  required
                />
              </div>
              {/* <div className="grid gap-2">
                <Label htmlFor="team-logo">Team Logo</Label>
                <Input id="team-logo" type="file" />
              </div> */}
              {/* <div className="grid gap-2">
                <Label htmlFor="team-members">Team Members</Label>
                <Textarea
                  id="team-members"
                  value={teamMembers}
                  onChange={(e) => setTeamMembers(e.target.value)}
                  placeholder="Enter email addresses separated by commas"
                  required
                />
              </div> */}
            </div>
            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}
            <DialogFooter>
              <Button type="button" variant="ghost">
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
