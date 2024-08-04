'use client'

import React, { useEffect, useState } from 'react'
import { apiClient } from '../../services/api/client/api'

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

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      {loading ? (
        <div className="text-black">Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : user ? (
        <div className="shadow-lg rounded-lg p-8 max-w-lg w-full">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mr-4">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800">User Profile</h2>
              <p className="text-gray-600">Welcome, {user.name}!</p>
            </div>
          </div>
          <div className="border-t border-gray-300 pt-4">
            <p className="text-lg text-gray-700 mb-2">
              <strong>ID:</strong> {user.id}
            </p>
            <p className="text-lg text-gray-700 mb-2">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="text-lg text-gray-700">
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
