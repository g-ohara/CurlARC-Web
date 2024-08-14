interface User {
  id: string
  name: string
  email: string
}

interface getTeamsResponse {
  Teams: {
    Id: string
    Name: string
  }[]
}

interface getUserResponse {
  id: string
  name: string
  email: string
}

interface getMembersResponse {
  Members: User[]
}

interface getTeamDetailsResponse {
  details: {
    key: string
    value: string
  }[]
}
