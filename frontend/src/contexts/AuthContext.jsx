import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

// Configuration de l'API Django
const API_BASE_URL = 'http://localhost:8000/api'

// Email de l'administrateur
const ADMIN_EMAIL = 'adouemmanuela@gmail.com'

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

  // Configuration d'axios
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      fetchUserProfile()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/profile/`)
      setUser(response.data)
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/token/`, { username, password })
      const { access } = response.data
      
      // Sauvegarder le token
      localStorage.setItem('token', access)
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`
      
      // Récupérer le profil utilisateur
      await fetchUserProfile()
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Identifiants incorrects' 
      }
    }
  }

  const register = async (userData) => {
    try {
      await axios.post(`${API_BASE_URL}/auth/register/`, userData)
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data || 'Erreur lors de l\'inscription' 
      }
    }
  }

  const updateProfile = async (userData) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/auth/profile/`, userData)
      setUser(response.data)
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data || 'Erreur lors de la mise à jour' 
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    delete axios.defaults.headers.common['Authorization']
  }

  // Vérifier si l'utilisateur est admin
  const isAdmin = user?.email === ADMIN_EMAIL

  const value = {
    user,
    loading,
    isAdmin,
    login,
    register,
    logout,
    updateProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}