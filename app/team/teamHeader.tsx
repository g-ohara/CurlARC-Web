import { UsersIcon } from '@/components/icons'

type TeamHeaderProps = {
  teamName: string
  memberCount: number
  score: {
    red: number
    blue: number
  }
}

export const TeamHeader: React.FC<TeamHeaderProps> = ({ teamName, memberCount, score }) => (
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
        <h3 className="text-bold text-5xl font-medium">{teamName}</h3>
        <p className="text-sm text-muted-foreground">
          <UsersIcon className="mr-1 inline h-4 w-4" /> {memberCount} members
        </p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <div className="rounded-md bg-red-500 px-2 py-1 text-sm font-medium text-white">{score.red}</div>
      <div className="rounded-md bg-blue-500 px-2 py-1 text-sm font-medium text-white">{score.blue}</div>
    </div>
  </div>
)
