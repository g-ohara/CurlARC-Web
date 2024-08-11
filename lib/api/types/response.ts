interface User {
  id: string
  name: string
  email: string
}

interface getTeamsResponse {
  status: string
  data: {
    id: string
    name: string
  }[]
}

interface getUserResponse {
  status: string
  data: User
}

interface getMembersResponse {
  status: string
  data: {
    members: User[]
  }
}

interface getTeamDetailsResponse {
  status: string
  data: {
    details: {
      key: string
      value: string
    }[]
  }
}
