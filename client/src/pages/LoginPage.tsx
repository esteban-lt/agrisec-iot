// src/pages/LoginPage.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Paper, TextField, Button,
  Typography, Alert, CircularProgress
} from '@mui/material'
import AgricultureIcon from '@mui/icons-material/Agriculture'
import { useAuth } from '../auth/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(ellipse at 50% 0%, #0d2e0d 0%, #0a0f0a 70%)',
    }}>
      <Paper sx={{ p: 4, width: 380, display: 'flex', flexDirection: 'column', gap: 3 }}>

        {/* Logo y título */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <AgricultureIcon sx={{ fontSize: 48, color: 'primary.main' }} />
          <Typography variant="h4" color="primary">AgriSec IoT</Typography>
          <Typography variant="body2" color="text.secondary">
            Sistema de Monitoreo Agrícola
          </Typography>
        </Box>

        {/* Campos */}
        <TextField
          label="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          size="small"
        />
        <TextField
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          fullWidth
          size="small"
        />

        {/* Error */}
        {error && <Alert severity="error">{error}</Alert>}

        {/* Botón */}
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || !email || !password}
          fullWidth
          size="large"
        >
          {loading ? <CircularProgress size={22} color="inherit" /> : 'Iniciar sesión'}
        </Button>

        {/* Credenciales de prueba */}
        <Box sx={{ borderTop: '1px solid #1b2e1b', pt: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Cuentas de prueba:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            productor@agrisec.mx / 1234
          </Typography>
          <Typography variant="body2" color="text.secondary">
            operador@agrisec.mx / 1234
          </Typography>
        </Box>

      </Paper>
    </Box>
  )
}
