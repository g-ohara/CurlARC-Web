'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'
import { getUser } from '@/lib/api/user'

interface AppContextType {
  isLoggedIn: boolean
  user: User | null
  login: (userData: User) => void
  logout: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // コンポーネントがマウントされたときにcookieをチェック
    const jwt = Cookies.get('jwt')
    if (jwt) {
      fetchUserData()
    }
  }, [])

  const fetchUserData = async () => {
    try {
      const user = await getUser()
      login(user)
    } catch (error) {
      console.error('Failed to fetch user data:', error)
      logout()
    }
  }

  const login = (userData: User) => {
    setIsLoggedIn(true)
    setUser(userData)
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUser(null)
    Cookies.remove('jwt')
  }

  const value: AppContextType = {
    isLoggedIn,
    user,
    login,
    logout
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = (): AppContextType => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
