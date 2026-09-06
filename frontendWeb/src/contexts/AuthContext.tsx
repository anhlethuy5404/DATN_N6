import React, { createContext, useContext, useState } from 'react'
import { User, UserRole } from '../types'
import { mockUsers } from '../mock/mockData'

interface AuthContextType {
  currentUser: User
  switchRole: (role: UserRole) => void
  cartCount: number
  unreadNotifsCount: number
  unreadMessagesCount: number
  savedProductIds: string[]
  toggleSaveProduct: (id: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('USER')
  const [savedProductIds, setSavedProductIds] = useState<string[]>(['1', '3'])
  const [cartCount] = useState<number>(2)
  const [unreadNotifsCount] = useState<number>(2)
  const [unreadMessagesCount] = useState<number>(2)

  const switchRole = (role: UserRole) => {
    setCurrentRole(role)
  }

  const toggleSaveProduct = (id: string) => {
    setSavedProductIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const user = mockUsers[currentRole] || mockUsers.USER

  return (
    <AuthContext.Provider
      value={{
        currentUser: user,
        switchRole,
        cartCount,
        unreadNotifsCount,
        unreadMessagesCount,
        savedProductIds,
        toggleSaveProduct
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
