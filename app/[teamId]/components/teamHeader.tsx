type TeamHeaderProps = {
  teamName: string
}

export function TeamHeader({ teamName }: TeamHeaderProps) {
  return (
    <h1 className="text-3xl font-bold">{teamName}</h1>
  )
}
