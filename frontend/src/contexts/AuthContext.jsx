import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Failed to parse stored user:', error)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // TODO: Replace with actual API call
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUser = {
        id: '1',
        name: email.split('@')[0],
        email: email,
        avatar: null
      }
      
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const signup = async (name, email, password) => {
    // TODO: Replace with actual API call
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUser = {
        id: '1',
        name: name,
        email: email,
        avatar: null
      }
      
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const loginWithGoogle = async () => {
    // TODO: Replace with actual Google OAuth
    try {
      // Simulate Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUser = {
        id: 'google-1',
        name: 'Google User',
        email: 'user@gmail.com',
        avatar: 'https://lh3.googleusercontent.com/a/default-user'
      }
      
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    loading,
    login,
    signup,
    loginWithGoogle,
    logout,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
