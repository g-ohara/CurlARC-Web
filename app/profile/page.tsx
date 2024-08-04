'use client'

import React, { useEffect, useState } from 'react'
import { apiClient } from '../../services/api/client/api'
import Link from 'next/link'

interface UserProfile {
  id: string
  name: string
  email: string
}

export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const uuid = getCookie('uuid')
        if (uuid) {
          const res = await apiClient.get('/auth/users/me')
          setUser(res.data)
        } else {
          setUser(null)
        }
      } catch (error) {
        setError('ユーザー情報の取得に失敗しました。')
      } finally {
        setLoading(false)
      }
    }
    fetchUserProfile()
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-white text-black">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : user ? (
        <div className="w-full max-w-lg rounded-lg p-8 shadow-lg">
          <div className="mb-6 flex items-center">
            <div className="mr-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-3xl font-bold text-white">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800">User Profile</h2>
              <p className="text-gray-600">Welcome, {user.name}!</p>
            </div>
          </div>
          <div className="border-t border-gray-300 pt-4">
            <p className="mb-2 text-lg text-gray-700">
              <strong>ID:</strong> {user.id}
            </p>
            <p className="mb-2 text-lg text-gray-700">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-black">
          <Link href="/login" className="text-blue-500 hover:underline">
            ログイン
          </Link>
          してください
        </div>
      )}
    </div>
  )
}
