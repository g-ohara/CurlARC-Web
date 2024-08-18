type getTeamsResponse = {
  teams: {
    id: string
    name: string
  }[]
}

type getMembersResponse = {
  members: User[]
}

type getTeamDetailsResponse = {
  details: {
    key: string
    value: string
  }[]
}

// user
type getUserResponse = {
  id: string
  name: string
  email: string
}

type signInResponse = {
  id: string
  name: string
  email: string
}

type getRecordIndicesByTeamIdResponse = {
  record_indices: {
    id: string
    result: Result
    enemy_team_name: string
    place: string
    date: Date
  }[]
}

type getRecordDetailsByRecordIdResponse = {
  record: RecordDetail
}
