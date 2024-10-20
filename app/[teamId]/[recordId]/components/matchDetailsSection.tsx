import { RecordDetail } from '../../../../types/model'
import React, { useState } from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table'
import { Input } from "@/components/ui/input"
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

const shotTypes = ['Draw', 'Guard', 'Takeout', 'Freeze']
const successRates = Array.from({ length: 11 }, (_, i) => i * 10)

export default function MatchDetailsSection({ record, selectedEndIndex, selectedShotIndex, onShotSelect, isEditMode, onShotsDetailsChange }: Props) {
  const selectedShotsData = record.ends_data?.[selectedEndIndex]?.shots ?? []

  const handleChange = (shotIndex: number, field: string, value: string | number) => {
    onShotsDetailsChange(selectedEndIndex, shotIndex, field, value)
  }

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-xl font-medium mb-4">Shots</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/4">Shot</TableHead>
              <TableHead>Shooter</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Success Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedShotsData.map((shot, index) => (
              <TableRow key={index} data-state={selectedShotIndex === index ? 'selected' : ''} onClick={() => onShotSelect(index)}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  {isEditMode ? (
                    <Input
                      value={shot.shooter}
                      onChange={(e) => handleChange(index, 'shooter', e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    shot.shooter
                  )}
                </TableCell>
                <TableCell>
                  {isEditMode ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                          {shot.type} <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        {shotTypes.map((type) => (
                          <DropdownMenuItem
                            key={type}
                            onSelect={() => handleChange(index, 'type', type)}
                          >
                            {type}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    shot.type
                  )}
                </TableCell>
                <TableCell className={`text-right ${getSuccessRateColor(shot.success_rate)}`}>
                  {isEditMode ? (
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
                            onSelect={() => handleChange(index, 'success_rate', rate)}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
