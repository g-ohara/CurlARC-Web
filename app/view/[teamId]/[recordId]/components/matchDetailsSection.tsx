import { RecordDetail } from '../../../../../types/model'
import React from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table'

type Props = {
  record: RecordDetail
  selectedEndIndex: number
  isEditMode: boolean
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

export default function MatchDetailsSection({ record, selectedEndIndex, isEditMode }: Props) {
  const selectedShotsData = record.ends_data[selectedEndIndex].shots ?? []

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Shots</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Shot</TableHead>
              <TableHead>Shooter</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Success Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedShotsData.map((shot, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{shot.shooter}</TableCell>
                <TableCell>{shot.type}</TableCell>
                <TableCell className={`text-right ${getSuccessRateColor(shot.success_rate)}`}>
                  {formatSuccessRate(shot.success_rate)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Match Details</h2>
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