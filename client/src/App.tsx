// src/App.tsx
// Define todas las rutas de la app y envuelve todo con el AuthProvider

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import ProtectedRoute from './auth/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ReadingsPage from './pages/ReadingsPage'
import ActuatorsPage from './pages/ActuatorsPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta pública */}
          <Route path="/login" element={<LoginPage />} />

          {/* Rutas protegidas — cualquier usuario logueado */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />

          <Route path="/readings" element={
            <ProtectedRoute>
              <ReadingsPage />
            </ProtectedRoute>
          } />

          {/* Ruta exclusiva del Productor */}
          <Route path="/actuators" element={
            <ProtectedRoute requiredRole="PRODUCTOR">
              <ActuatorsPage />
            </ProtectedRoute>
          } />

          {/* Redirige la raíz al login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}