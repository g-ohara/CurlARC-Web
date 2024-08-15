interface Team {
  id: string
  name: string
  members: User[]
  details: {
    key: string
    value: string
  }[]
}
