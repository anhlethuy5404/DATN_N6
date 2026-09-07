import React, { createContext, useContext, useState, ReactNode } from 'react'
import { User, UserRole } from '../types'
import { mockUsers } from '../mock/mockData'

interface AuthContextType {
  currentUser: User
  setCurrentUser: (user: User) => void
  isAuthenticated: boolean
  login: (role?: UserRole) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(mockUsers.USER)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true)

  const login = (role: UserRole = 'USER') => {
    setCurrentUser(mockUsers[role] || mockUsers.USER)
    setIsAuthenticated(true)
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
