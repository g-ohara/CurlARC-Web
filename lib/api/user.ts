import { apiClient } from '@/utils/api/api'
import { cache } from 'react'

export const getUser = cache(async (): Promise<getUserResponse> => {
  const res = await apiClient.get<getUserResponse>(`/auth/users/me`)
  return res
})

export const registerUser = cache(async (data: registerUserRequest): Promise<any> => {
  const res = await apiClient.post<any>('/signup', data)
  return res
})
