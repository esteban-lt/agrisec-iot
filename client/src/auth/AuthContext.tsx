// src/auth/AuthContext.tsx
// Maneja toda la autenticación de la app
// Cualquier componente puede saber quién está logueado y su rol

import { createContext, useContext, useState, type ReactNode } from 'react'
import { MOCK_USERS } from '../api/mock'

// --- Tipos ---
interface User {
  id: number
  email: string
  role: 'PRODUCTOR' | 'OPERADOR'
  name: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

// --- Contexto ---
const AuthContext = createContext<AuthContextType | null>(null)

// --- Provider ---
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const login = async (email: string, password: string) => {
    // Busca el usuario en los mocks
    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    )

    if (!found) {
      throw new Error('Credenciales incorrectas')
    }

    // Simula un JWT (cuando la API real esté lista, esto vendrá del backend)
    const fakeToken = btoa(JSON.stringify({ id: found.id, role: found.role }))

    setUser({ id: found.id, email: found.email, role: found.role as 'PRODUCTOR' | 'OPERADOR', name: found.name })
    setToken(fakeToken)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// --- Hook personalizado ---
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}