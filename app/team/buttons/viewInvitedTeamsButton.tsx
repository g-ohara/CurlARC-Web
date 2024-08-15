'use client'

import { UsersIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { getInvitedTeams } from '@/lib/api/team'
import { useEffect, useState } from 'react'
import AcceptInvitationButton from './acceptInvitationButton'

type Team = {
  id: string
  name: string
}

export default function ViewInvitedTeamsButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [invitedTeams, setInvitedTeams] = useState<Team[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getInvitedTeams()
        setInvitedTeams(res.teams)
      } catch (error) {
        console.error('Error fetching invited teams:', error)
      }
    }

    if (isOpen) {
      fetchData()
    }
  }, [isOpen])

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen} defaultOpen={false}>
        <DialogTrigger asChild>
          <Button variant="outline" size="default">
            View Invited Teams
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invited Teams</DialogTitle>
            <DialogDescription>Here are the teams you've been invited to.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            {invitedTeams ? (
              invitedTeams.map((team) => (
                <Card key={team.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={'/placeholder.svg'}
                          width={40}
                          height={40}
                          alt="Team Logo"
                          className="rounded-full"
                          style={{ aspectRatio: '40/40', objectFit: 'cover' }}
                        />
                        <div>
                          <h3 className="text-lg font-medium">{team.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            <UsersIcon className="mr-1 inline h-4 w-4" /> {0} members
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <AcceptInvitationButton teamId={team.id} />
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))
            ) : (
              <p>No invited teams found.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
