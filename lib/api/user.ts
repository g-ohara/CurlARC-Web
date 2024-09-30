import { auth } from '@/firebaseConfig'
import { registerUserRequest, signInRequest } from '@/types/request'
import { getUserResponse, signInResponse } from '@/types/response'
import { apiClient } from '@/utils/api/api'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { cache } from 'react'

export const signIn = cache(async (data: signInRequest): Promise<any> => {
  const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
  const idToken = await userCredential.user.getIdToken()
  const res = await apiClient.post<signInResponse>('/signin', { id_token: idToken })
  return res
})

export const getUser = cache(async (): Promise<getUserResponse> => {
  const res = await apiClient.get<getUserResponse>(`/auth/users/me`)
  return res
})

export const registerUser = cache(async (data: registerUserRequest): Promise<any> => {
  const res = await apiClient.post<any>('/signup', data)
  return res
})
