import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import apiClient from '../api/axios'

// Interface pour les données utilisateur
export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: 'librarian' | 'member'
}

// Interface pour le contexte d'authentification
interface AuthContextType {
  user: User | null
  token: string | null
  login: (
    email: string,
    password: string,
    expectedRole?: string,
  ) => Promise<void>
  logout: () => void
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: 'librarian' | 'member',
  ) => Promise<void>
  isAuthenticated: boolean
}

// Création du contexte
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider du contexte d'authentification
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  // Charger les données depuis le localStorage au démarrage
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // Fonction de connexion
  const login = async (
    email: string,
    password: string,
    expectedRole?: string,
  ) => {
    const response = await apiClient.post('/users/login', {
      email,
      password,
      expectedRole,
    })

    // Stocker le token et l'utilisateur
    setToken(response.data.access_token)
    setUser(response.data.user)

    // Sauvegarder dans le localStorage
    localStorage.setItem('token', response.data.access_token)
    localStorage.setItem('user', JSON.stringify(response.data.user))
  }

  // Fonction de déconnexion
  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  // Fonction d'inscription
  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: 'librarian' | 'member',
  ) => {
    await apiClient.post('/users', {
      firstName,
      lastName,
      email,
      password,
      role,
    })
  }

  const isAuthenticated = !!user && !!token

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, signup, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook pour utiliser le contexte d'authentification
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider')
  }
  return context
}
