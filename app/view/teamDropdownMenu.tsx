'use client'

import { UsersIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useState } from 'react'

type Team = {
  id: string
  name: string
}

export default function TeamDropdownMenu() {
  const [selectedTeam, setSelectedTeam] = useState<Team>()
  const teams = [
    { id: '1', name: 'Team Frosty' },
    { id: '2', name: 'Team Snowflake' },
    { id: '3', name: 'Team Icicle' }
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="transition ease-in-out hover:scale-105 hover:bg-primary-foreground"
        >
          {selectedTeam ? (
            <div className="flex items-center gap-2">
              <img
                src="/placeholder.svg"
                width={32}
                height={32}
                alt="Team Logo"
                className="rounded-full"
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
            onClick={() => setSelectedTeam(team)}
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
