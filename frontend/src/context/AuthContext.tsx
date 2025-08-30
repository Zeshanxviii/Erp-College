// src/context/AuthContext.tsx
import React, { createContext, useContext, useState} from 'react'

// Define the user type (adjust based on your actual user data structure)
export interface User {
  id: string
  email: string
  name: string
  // Add other user properties as needed
}

// Define the context type
interface AuthContextType {
  user: User | null
  login: (userData: User) => void
  logout: () => void
}

// Create context with initial undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Props interface for AuthProvider
interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null) // user = null means unauthenticated

  const login = (userData: User) => setUser(userData)
  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}