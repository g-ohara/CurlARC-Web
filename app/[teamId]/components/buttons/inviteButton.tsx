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
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { inviteUsers } from '@/lib/api/team'

import { Plus } from 'lucide-react'

interface InviteButtonProps {
  teamId: string
  teamName: string
}

export default function InviteButton({ teamId, teamName }: InviteButtonProps) {
  const [invitedUsers, setInvitedUsers] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // 成功メッセージを表示してから1秒後にダイアログを閉じる
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setIsOpen(false)
        setSuccess(null)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [success])

  // フォームの送信処理
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // メールアドレスをカンマ区切りで分割して配列に変換
      const emails = invitedUsers.split(',').map((email) => email.trim())
      const validEmails = emails.filter((email) => isValidEmail(email))
      // validEmailsが空の場合はエラーメッセージを設定
      if (validEmails.length === 0) {
        setError('Please enter at least one valid email address.')
        return
      }
      // ユーザー招待APIを呼び出す
      await inviteUsers(teamId, validEmails)
      setInvitedUsers('')
      // 成功メッセージ
      setSuccess('Invited users successfully!')
    } catch (error: any) {
        setError('Failed to Invite. Please try again.\n' + error.error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen} defaultOpen={false}>
        <DialogTrigger asChild className="ml-3">
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
            <DialogTitle>Invite Users to {teamName} Team</DialogTitle>
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
                  value={invitedUsers}
                  onChange={(e) => setInvitedUsers(e.target.value)}
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
