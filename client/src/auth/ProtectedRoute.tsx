// src/auth/ProtectedRoute.tsx
// Protege rutas según si el usuario está logueado y su rol

import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

interface Props {
  children: React.ReactNode
  requiredRole?: 'PRODUCTOR' | 'OPERADOR'
}

export default function ProtectedRoute({ children, requiredRole }: Props) {
  const { isAuthenticated, user } = useAuth()

  // Si no está logueado, manda al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Si la ruta requiere un rol específico y no lo tiene, manda al dashboard
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}