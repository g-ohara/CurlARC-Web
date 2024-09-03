import { FC } from 'react'

const ScoreCell: FC<ScoreCellProps> = ({ score }) => (
  <td className="border-b border-muted px-4 py-2 text-center">{score}</td>
)

const ScoreRow: FC<ScoreData> = ({ team, color, scores, total }) => (
  <tr>
    <td className={`border-b border-muted bg-${color}-500 px-4 py-2 font-bold text-${color}-50`}>{team}</td>
    {scores.map((score, index) => (
      <ScoreCell key={`${team}-${index}`} score={score} />
    ))}
    <td className="border-b border-muted px-4 py-2 text-center font-bold">{total}</td>
  </tr>
)

const ScoreBoard: FC<ScoreBoardProps> = ({ friendScore, enemyScore }) => {
  const headers = Array.from({ length: 11 }, (_, i) => i)

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted">
            <th className="border-b border-muted px-4 py-2 text-left">TEAM</th>
            {headers.map((header) => (
              <th key={`header-${header}`} className="border-b border-muted px-4 py-2 text-center">
                {header}
              </th>
            ))}
            <th className="border-b border-muted px-4 py-2 text-center">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          <ScoreRow key={`team-${friendScore.team}`} {...friendScore} />
          <ScoreRow key={`team-${enemyScore.team}`} {...enemyScore} />
        </tbody>
      </table>
    </div>
  )
}

export default ScoreBoard
