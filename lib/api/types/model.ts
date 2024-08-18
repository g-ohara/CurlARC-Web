type User = {
  id: string
  name: string
  email: string
}

type Result = 'WIN' | 'DRAW' | 'LOSE'

type RecordIndex = {
  id: string
  result: Result
  enemy_team_name: string
  place: string
  date: Date
}

type Team = {
  id: string
  name: string
  members: User[]
  details: {
    key: string
    value: string
  }[]
}
