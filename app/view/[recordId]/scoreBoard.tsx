import React from 'react'

type Score = number | string

export type TeamScore = {
  team: string
  color: string
  scores: Score[]
  total: number
}

interface ScoreCellProps {
  score: Score
}

interface ScoreRowProps extends TeamScore {}

interface ScoreBoardProps {
  scores: TeamScore[]
}

const ScoreCell: React.FC<ScoreCellProps> = ({ score }) => (
  <td className="border-b border-muted px-4 py-2 text-center">{score}</td>
)

const ScoreRow: React.FC<ScoreRowProps> = ({ team, color, scores, total }) => (
  <tr>
    <td className={`border-b border-muted bg-${color}-500 px-4 py-2 font-bold text-${color}-50`}>{team}</td>
    {scores.map((score, index) => (
      <ScoreCell key={index} score={score} />
    ))}
    <td className="border-b border-muted px-4 py-2 text-center font-bold">{total}</td>
  </tr>
)

export default function ScoreBoard({ scores }: ScoreBoardProps) {
  const headers = Array.from({ length: 11 }, (_, i) => i)

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted">
            <th className="border-b border-muted px-4 py-2 text-left">TEAM</th>
            {headers.map((header) => (
              <th key={header} className="border-b border-muted px-4 py-2 text-center">
                {header}
              </th>
            ))}
            <th className="border-b border-muted px-4 py-2 text-center">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((teamScore, index) => (
            <ScoreRow key={index} {...teamScore} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
