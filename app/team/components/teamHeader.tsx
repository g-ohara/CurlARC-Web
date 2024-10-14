type TeamHeaderProps = {
  teamName: string
}

export function TeamHeader({ teamName }: TeamHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">{teamName}</h2>
    </div>
  )
}
