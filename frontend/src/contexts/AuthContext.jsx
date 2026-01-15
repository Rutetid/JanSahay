import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../lib/api'

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
  const [session, setSession] = useState(null)

  // Load user from session on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedSession = localStorage.getItem('supabase_session')
        const storedUser = localStorage.getItem('user')
        
        if (storedSession && storedUser) {
          const parsedSession = JSON.parse(storedSession)
          const parsedUser = JSON.parse(storedUser)
          
          // Verify session is still valid by fetching current user
          try {
            const response = await authAPI.getMe()
            setUser(response.user)
            setSession(parsedSession)
          } catch (error) {
            // Session invalid, clear storage
            console.error('Session validation failed:', error)
            localStorage.removeItem('supabase_session')
            localStorage.removeItem('user')
            setUser(null)
            setSession(null)
          }
        }
      } catch (error) {
        console.error('Failed to load user:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password)
      
      if (response.session) {
        setUser(response.user)
        setSession(response.session)
        localStorage.setItem('user', JSON.stringify(response.user))
        localStorage.setItem('supabase_session', JSON.stringify(response.session))
        return { success: true }
      }
      
      return { success: false, error: 'Login failed' }
    } catch (error) {
      console.error('Login error:', error)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      }
    }
  }

  const signup = async (name, email, password) => {
    try {
      const response = await authAPI.signup(email, password, name)
      
      // Signup successful, but requires email verification
      if (response.requiresEmailVerification) {
        return { 
          success: true, 
          requiresVerification: true,
          message: response.message,
          email: email
        }
      }
      
      return { success: true, requiresVerification: false }
    } catch (error) {
      console.error('Signup error:', error)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Signup failed' 
      }
    }
  }

  const logout = async () => {
    try {
      await authAPI.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      setSession(null)
      localStorage.removeItem('user')
      localStorage.removeItem('supabase_session')
    }
  }

  const verifyEmail = async (token, type) => {
    try {
      const response = await authAPI.verifyEmail(token, type)
      
      if (response.session) {
        setUser(response.user)
        setSession(response.session)
        localStorage.setItem('user', JSON.stringify(response.user))
        localStorage.setItem('supabase_session', JSON.stringify(response.session))
        return { success: true }
      }
      
      return { success: false, error: 'Verification failed' }
    } catch (error) {
      console.error('Email verification error:', error)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Verification failed' 
      }
    }
  }

  const resendVerification = async (email) => {
    try {
      await authAPI.resendVerification(email)
      return { success: true }
    } catch (error) {
      console.error('Resend verification error:', error)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to resend verification email' 
      }
    }
  }

  const value = {
    user,
    session,
    loading,
    login,
    signup,
    logout,
    verifyEmail,
    resendVerification,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
