import { getMembersResponse, getTeamDetailsResponse, getTeamsResponse } from '@/types/response'
import { apiClient } from '@/utils/api/api'
import { cache } from 'react'

export const createTeam = async (teamName: string): Promise<any> => {
  const res = await apiClient.post<any>(`/auth/teams/`, { name: teamName })
  return res
}

export const deleteTeam = async (teamId: string): Promise<any> => {
  const res = await apiClient.destroy<any>(`/auth/teams/${teamId}`)
  return res
}

export const removeTeamMembers = async (teamId: string, userId: string): Promise<any> => {
  const res = await apiClient.destroy<any>(`/auth/teams/${teamId}/${userId}`)
  return res
}

export const inviteUsers = async (teamId: string, emails: string[]): Promise<any> => {
  const res = await apiClient.post<any>(`/auth/teams/${teamId}/invite`, { target_user_emails: emails })
  return res
}

export const acceptInvitation = async (teamId: string): Promise<any> => {
  const res = await apiClient.post<any>(`/auth/teams/${teamId}/accept`)
  return res
}

export const getInvitedTeams = cache(async (): Promise<getTeamsResponse> => {
  const res = await apiClient.get<getTeamsResponse>(`/auth/users/me/teams/invited`, 'getInvitedTeams')
  return res
})

export const getTeamsByUserId = cache(async (): Promise<getTeamsResponse> => {
  const res = await apiClient.get<getTeamsResponse>(`/auth/users/me/teams`, 'getTeamsByUserId')
  return res
})

export const getMembersByTeamId = cache(async (teamId: string): Promise<getMembersResponse> => {
  const res = await apiClient.get<getMembersResponse>(`/auth/teams/${teamId}/members`)
  return res
})

export const getTeamDetailsByTeamId = cache(async (teamId: string): Promise<getTeamDetailsResponse> => {
  const res = await apiClient.get<getTeamDetailsResponse>(`/auth/teams/${teamId}/details`)
  return res
})
