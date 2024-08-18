import { apiClient } from '@/utils/api/api'
import { cache } from 'react'

export const getRecordsByTeamId = cache(async (teamId: string): Promise<getRecordIndicesByTeamIdResponse> => {
  const res = await apiClient.get<getRecordIndicesByTeamIdResponse>(`/auth/records/${teamId}`)
  return res
})
