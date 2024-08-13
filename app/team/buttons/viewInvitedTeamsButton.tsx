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

export default function ViewInvitedTeamsButton() {
  return (
    <>
      <Dialog defaultOpen={false}>
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
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="/placeholder.svg"
                      width={40}
                      height={40}
                      alt="Team Logo"
                      className="rounded-full"
                      style={{ aspectRatio: '40/40', objectFit: 'cover' }}
                    />
                    <div>
                      <h3 className="text-lg font-medium">Team Snowflake</h3>
                      <p className="text-sm text-muted-foreground">
                        <UsersIcon className="mr-1 inline h-4 w-4" /> 4 members
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Accept Invitation
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="/placeholder.svg"
                      width={40}
                      height={40}
                      alt="Team Logo"
                      className="rounded-full"
                      style={{ aspectRatio: '40/40', objectFit: 'cover' }}
                    />
                    <div>
                      <h3 className="text-lg font-medium">Team Icicle</h3>
                      <p className="text-sm text-muted-foreground">
                        <UsersIcon className="mr-1 inline h-4 w-4" /> 6 members
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Accept Invitation
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
