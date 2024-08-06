import { CalendarIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'

interface TeamFooterProps {
  lastGameDate: string
}

export const TeamFooter: React.FC<TeamFooterProps> = ({ lastGameDate }) => (
  <div className="flex items-center justify-between">
    <div className="text-sm text-muted-foreground">
      <CalendarIcon className="mr-1 inline h-4 w-4" /> Last game: {lastGameDate}
    </div>
    <Button variant="outline" size="sm">
      View Records
    </Button>
  </div>
)
