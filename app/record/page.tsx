'use server'

import Subpage from './subpage'
import { getTeamsByUserId } from '../../lib/api/team'

export default async function Main() {

  const res = await getTeamsByUserId()
  return <Subpage teams={res.teams} />
}
