'use client'

import React, { FC, useState } from 'react'

interface ScoreCellProps {
  score: number
  isHeader: boolean
  isSelected: boolean
  onClick?: () => void
}

interface ScoreData {
  team: string
  color: string
  scores: number[]
  total: number
}

interface ScoreBoardProps {
  friendScore: ScoreData
  enemyScore: ScoreData
}

const ScoreCell: FC<ScoreCellProps> = ({ score, isHeader, isSelected, onClick }) => (
  <td 
    className={`border-b border-muted px-4 py-2 text-center ${
      isHeader ? 'cursor-pointer hover:bg-gray-200' : ''
    } ${isSelected ? 'border-yellow-300 border-4' : ''}`}
    onClick={onClick}
  >
    {score}
  </td>
)

const ScoreRow: FC<ScoreData & { selectedRound: number | null; onRoundSelect: (round: number) => void }> = 
  ({ team, color, scores, total, selectedRound, onRoundSelect }) => (
  <tr>
    <td className={`border-b border-muted bg-${color}-500 px-4 py-2 font-bold text-${color}-50`}>{team}</td>
    {scores.map((score, index) => (
      <ScoreCell 
        key={`${team}-${index}`} 
        score={score} 
        isHeader={false}
        isSelected={selectedRound === index}
        onClick={() => onRoundSelect(index)}
      />
    ))}
    <td className="border-b border-muted px-4 py-2 text-center font-bold">{total}</td>
  </tr>
)

const ScoreBoard: FC<ScoreBoardProps> = ({ friendScore, enemyScore }) => {
  const [selectedRound, setSelectedRound] = useState<number>(0)
  const headers = Array.from({ length: 10 }, (_, i) => i + 1)

  const handleRoundSelect = (round: number) => {
    setSelectedRound(round)
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted">
            <th className="border-b border-muted px-4 py-2 text-left">TEAM</th>
            <th className="border-b border-muted px-4 py-2 text-center"></th>
            {headers.map((header) => (
              <th 
                key={`header-${header}`} 
                className={`border-b border-muted px-4 py-2 text-center cursor-pointer 
                  ${selectedRound + 1 === header ? 'border-yellow-300 border-4' : 'hover:bg-gray-200'}`}
                onClick={() => handleRoundSelect(header - 1)}
              >
                {header}
              </th>
            ))}
            <th className="border-b border-muted px-4 py-2 text-center">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          <ScoreRow 
            key={`team-${friendScore.team}`} 
            {...friendScore} 
            selectedRound={selectedRound + 1}
            onRoundSelect={handleRoundSelect}
          />
          <ScoreRow 
            key={`team-${enemyScore.team}`} 
            {...enemyScore} 
            selectedRound={selectedRound + 1}
            onRoundSelect={handleRoundSelect}
          />
        </tbody>
      </table>
    </div>
  )
}

export default ScoreBoard