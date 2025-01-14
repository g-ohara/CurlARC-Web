import { RecordDetail } from '../../../../types/model'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

type Props = {
  record: RecordDetail
  selectedEndIndex: number
  selectedShotIndex: number
  onShotSelect: (shotIndex: number) => void
  isEditMode: boolean
  onShotsDetailsChange: (endIndex: number, shotIndex: number, field: string, value: string | number) => void
}

const getSuccessRateColor = (rate: number): string => {
  if (rate >= 80) return 'text-green-600 font-semibold'
  if (rate >= 60) return 'text-yellow-600'
  if (rate >= 40) return 'text-red-600'
  return 'text-red-600'
}

const formatSuccessRate = (rate: number): string => {
  return `${(rate).toFixed(1)}%`
}

const successRates = Array.from({ length: 11 }, (_, i) => i * 10)

export default function MatchDetailsSection({ record, selectedEndIndex, selectedShotIndex, onShotSelect, isEditMode, onShotsDetailsChange }: Props) {

  // Get whether the user has the first stone in this end or not.
  // In curling...
  // (1) the team that got score in the previous end has the first stone.
  // (2) if the previous end has no score, the team that had the first stone
  //     in the previous end has the first stone again.
  const getIsFirstInThisEnd = (endIndex: number): boolean => {
    if (endIndex === 0) {
      return record.is_first;
    }
    else if (record.ends_data[endIndex - 1].score === 0) {
      return getIsFirstInThisEnd(endIndex - 1);
    }
    else {
      return record.ends_data[endIndex - 1].score > 0;
    }
  }

  const selectedShotsData = record.ends_data?.[selectedEndIndex]?.shots ?? []

  const handleChange = (shotIndex: number, field: string, value: string | number) => {
    onShotsDetailsChange(selectedEndIndex, shotIndex, field, value)
  }

  const headerColors = ["bg-red-100", "bg-yellow-100"]

  const SuccessRateCell = ({ shotIndex }: { shotIndex: number }) => {
    const shot = selectedShotsData[shotIndex]
    const successRateColor = shot ? getSuccessRateColor(shot.success_rate) : 'bg-white'
    const selected = selectedShotIndex === shotIndex
    return (
      shot &&
      <TableCell className={`text-right ${successRateColor} hover:bg-muted/50 ${selected && 'bg-muted'}`} onClick={() => onShotSelect(shotIndex)}>
        {
          isEditMode ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {formatSuccessRate(shot.success_rate)} <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {successRates.map((rate) => (
                  <DropdownMenuItem
                    key={rate}
                    onSelect={() => handleChange(shotIndex, 'success_rate', rate)}
                  >
                    {rate}%
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            formatSuccessRate(shot.success_rate)
          )}
      </TableCell>
    );
  }

  const ShotRow = ({ index }: { index: number }) => {
    return (
      <TableRow key={index} data-state={selectedShotIndex === index ? 'selected' : ''}>
        {index * 2 < selectedShotsData.length &&
          <TableCell className="font-medium">{index + 1}</TableCell>
        }
        {[0, 1].map((i) => (
          <SuccessRateCell shotIndex={index * 2 + i} />
        ))}
      </TableRow>
    );
  }

  const isFirstInThisEnd = getIsFirstInThisEnd(selectedEndIndex);

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-xl font-medium mb-4">Shots</h2>
        <div className="w-full max-h-[35vh] overflow-y-auto display-block">
          <Table className="overflow-y-auto">
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/6">No.</TableHead>
                {((record.is_red ? isFirstInThisEnd : !isFirstInThisEnd) ? headerColors : headerColors.reverse()).map((color) => (
                  <TableHead className={`w-1/3 ${color}`}>Success Rate</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
                <ShotRow key={index} index={index} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-medium mb-4">Match Details</h2>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Date</TableCell>
              <TableCell>{String(record.date)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Venue</TableCell>
              <TableCell>{record.place}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  )
}
