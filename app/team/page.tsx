'use client'

import React, { useEffect, useState } from 'react'
import { apiClient } from '../../utils/api/api'

interface UserProfile {
  id: string
  name: string
  email: string
}

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await apiClient.get('/auth/users/me')
        setUser(res.data)
      } catch (error) {
        setError('ユーザー情報の取得に失敗しました。')
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="bg-gray-100 flex min-h-screen items-center justify-center">
      {user ? (
        <div className="bg-white w-full max-w-lg rounded-lg p-8 shadow-lg">
          <div className="mb-6 flex items-center">
            <div className="rounded-full bg-blue-500 text-white mr-4 flex h-16 w-16 items-center justify-center text-3xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-gray-800 text-4xl font-bold">User Profile</h2>
              <p className="text-gray-600">Welcome, {user.name}!</p>
            </div>
          </div>
          <div className="border-gray-300 border-t pt-4">
            <p className="text-gray-700 mb-2 text-lg">
              <strong>ID:</strong> {user.id}
            </p>
            <p className="text-gray-700 mb-2 text-lg">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="text-gray-700 text-lg">
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-black">No user data available.</div>
      )}
    </div>
  )
}