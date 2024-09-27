'use client'

import React, { useState } from 'react'
import { getRecordDetailsByRecordId } from '@/lib/api/record'
import { DeleteRecordButton } from './components/DeleteRecordButton'
import { extractTeamsScoreData } from '@/utils/func/score'
import { Coordinate } from '@/types/model'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import ScoreBoard from './components/scoreBoard'
import { SheetContainer } from './components/sheetContainer'

export default function RecordPage({ params }: { params: { teamName: string; recordId: string } }) {
  const [selectedShot, setSelectedShot] = useState<number | null>(null)
  const [recordDetails, setRecordDetails] = useState<any>(null)
  const [teamScoreData, setTeamScoreData] = useState<any>(null)

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await getRecordDetailsByRecordId(params.recordId)
      const details = res.record
      setRecordDetails(details)
      const scoreData = extractTeamsScoreData(details)
      scoreData.friend.team = params.teamName
      setTeamScoreData(scoreData)
    }
    fetchData()
  }, [params.recordId, params.teamName])

  const friendStonesDummy: Coordinate[] = [
    { index: 0, r: 100, theta: 60 },
    { index: 1, r: 150, theta: 10 },
    { index: 2, r: 20, theta: 20 },
    { index: 3, r: 500, theta: 30 },
    { index: 4, r: 300, theta: 40 },
    { index: 5, r: 400, theta: 50 },
  ]
  const enemyStonesDummy: Coordinate[] = [
    { index: 0, r: 200, theta: 60 },
    { index: 1, r: 350, theta: 10 },
    { index: 2, r: 40, theta: 20 },
    { index: 3, r: 600, theta: 30 },
    { index: 4, r: 400, theta: 40 },
    { index: 5, r: 300, theta: 50 },
  ]

  if (!recordDetails || !teamScoreData) {
    return <div className="w-full h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {params.teamName} vs. {recordDetails.enemy_team_name}
          </h1>
          <DeleteRecordButton
            recordId={params.recordId}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-grow lg:w-3/5">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <ScoreBoard friendScore={teamScoreData.friend} enemyScore={teamScoreData.enemy} />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                      {selectedShot ? `Shot ${selectedShot}` : 'Select Shot'}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white shadow-lg rounded-md p-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((shot) => (
                      <DropdownMenuItem
                        key={shot}
                        onSelect={() => setSelectedShot(shot)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Shot {shot}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">Match Details</h2>
              <p className="text-gray-600">Date: {String(recordDetails.date)}</p>
              <p className="text-gray-600">Venue: {recordDetails.place}</p>
            </div>
          </div>
          <div className="lg:w-2/5">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Stone Positions</h2>
              <SheetContainer 
                friendStones={friendStonesDummy} 
                enemyStones={enemyStonesDummy} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}