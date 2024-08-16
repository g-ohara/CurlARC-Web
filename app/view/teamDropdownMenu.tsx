'use client'

import { UsersIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useState } from 'react'

type Team = {
  id: string
  name: string
}

type TeamDropdownMenuProps = {
  teams: Team[]
  onSelect: (teamId: string) => void
}

export default function TeamDropdownMenu({ teams, onSelect }: TeamDropdownMenuProps) {
  const [selectedTeam, setSelectedTeam] = useState<Team | undefined>()

  const handleTeamSelect = (team: Team) => {
    setSelectedTeam(team)
    onSelect(team.id)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="transition ease-in-out hover:scale-105 hover:bg-primary-foreground"
        >
          {selectedTeam ? (
            <div className="flex w-full items-center">
              <img
                src="/placeholder.svg"
                width={32}
                height={32}
                alt="Team Logo"
                className="mr-5 rounded-full"
                style={{ aspectRatio: '32/32', objectFit: 'cover' }}
              />
              <span>{selectedTeam.name}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <UsersIcon className="h-6 w-6" />
              <span>Select a Team</span>
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {teams.map((team) => (
          <DropdownMenuItem
            key={team.id}
            onClick={() => handleTeamSelect(team)}
            className={selectedTeam?.id === team.id ? 'bg-primary text-primary-foreground' : ''}
          >
            <div className="flex items-center gap-2">
              <img
                src="/placeholder.svg"
                width={32}
                height={32}
                alt="Team Logo"
                className="rounded-full"
                style={{ aspectRatio: '32/32', objectFit: 'cover' }}
              />
              <span>{team.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
