type TeamHeaderProps = {
  teamName: string
  score: {
    red: number
    blue: number
  }
}

export function TeamHeader({ teamName, score }: TeamHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold">{teamName}</h2>
      <div className="flex space-x-2">
        <span className="text-red-500">{score.red}</span>
        <span>-</span>
        <span className="text-blue-500">{score.blue}</span>
      </div>
    </div>
  )
}
