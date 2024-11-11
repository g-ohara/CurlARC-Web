import { ChevronRightIcon } from '@/components/icons'
import { Result } from '@/types/model'
import Link from 'next/link'

type RecordItemProps = {
  recordId: string
  result: Result
  teamId: string
  enemyTeamName: string
  date: string
}

function RecordItem({ recordId, result, teamId, enemyTeamName, date }: RecordItemProps) {

  let resultColor = '';
  switch (result) {
    case 'WIN':
      resultColor = 'bg-red-500 text-white';
      break;
    case 'LOSE':
      resultColor = 'bg-primary text-primary-foreground';
      break;
    case 'DRAW':
      resultColor = 'bg-yellow-500 text-white';
      break;
  }
  return (
    <Link
      href={`${teamId}/${recordId}`}
      className="flex items-center justify-between rounded-lg bg-muted/10 p-4 hover:bg-muted/20"
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-16 rounded-md px-2 py-1 text-center text-sm font-medium ${resultColor}`}
        >
          {result}
        </div>
        <div>
          <p className="font-medium">{`vs. ${enemyTeamName}`}</p>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
      </div>
      <ChevronRightIcon className="h-6 w-6 text-muted-foreground" />
    </Link>
  )
}

export default RecordItem
