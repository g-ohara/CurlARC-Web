import React from 'react'
import { useSession } from 'next-auth/react'

export default function Profile() {
  const {data: session} = useSession()
  const user = session?.user

  return (
    <div className="mx-auto my-auto flex bg-white text-black">
      {user ? (
        <div className="w-full rounded-lg p-3 shadow-lg flex items-center">
            <img
              src={user.image ?? '/default-profile.png'}
              className="w-15 h-15 rounded-full p-4"
            /> 
            <div>
              <p className="mb-2 text-lg text-gray-700">
                <strong>Name:</strong> {user.name}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Email:</strong> {user.email}
              </p>
          </div>
        </div>
      ) : (
        <div>
          ログインしてください
        </div>
      )}
    </div>
  )
}
