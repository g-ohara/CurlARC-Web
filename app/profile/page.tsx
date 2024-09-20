'use client'

import React from 'react'
import Link from 'next/link'
import { useApp } from '@/app/context/appProvider'

export default function Profile() {
  const { user } = useApp()

  return (
    <div className="mx-auto my-auto flex h-80 bg-white text-black">
      {user ? (
        <div className="w-full max-w-lg rounded-lg p-8 shadow-lg">
          <div className="mb-6 flex items-center">
            <div className="mr-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-3xl font-bold text-white">
              {user.name ? user.name.charAt(0) : 'U'}
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
