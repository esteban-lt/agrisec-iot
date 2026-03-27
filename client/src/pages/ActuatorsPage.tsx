// src/pages/ActuatorsPage.tsx
import { useState } from 'react'
import {
  Box, Typography, Paper, Chip, Switch,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Divider, Alert
} from '@mui/material'
import WaterIcon from '@mui/icons-material/Water'
import Layout from '../components/Layout'
import { MOCK_ACTUATORS, MOCK_ACTUATOR_LOG } from '../api/mock'

export default function ActuatorsPage() {
  const [actuators, setActuators] = useState(MOCK_ACTUATORS)
  const [log, setLog] = useState(MOCK_ACTUATOR_LOG)

  const handleToggle = (id: number) => {
    const updated = actuators.map((a) => {
      if (a.id !== id) return a
      const newStatus = !a.status

      // Agregar entrada al log
      setLog((prev) => [{
        id: prev.length + 1,
        actuator: a.name,
        action: newStatus ? 'ON' : 'OFF',
        user: 'productor@agrisec.mx',
        timestamp: new Date().toISOString(),
      }, ...prev])

      return { ...a, status: newStatus }
    })
    setActuators(updated)
  }

  return (
    <Layout>
      <Box sx={{ maxWidth: 1000 }}>

        {/* Encabezado */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" color="primary" gutterBottom>
            Control de actuadores
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Activación y desactivación de bombas de riego
          </Typography>
        </Box>

        {/* Alerta RBAC — visible para el maestro */}
        <Alert severity="info" sx={{ mb: 3, backgroundColor: '#0d1a2e', color: '#90caf9' }}>
          Acceso exclusivo rol <strong>PRODUCTOR</strong> — el Operador recibe 403 al intentar entrar a esta ruta.
        </Alert>

        {/* Tarjetas de bombas */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
          {actuators.map((a) => (
            <Paper key={a.id} sx={{
              p: 2.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: a.status ? '1px solid #4caf50' : '1px solid #1b2e1b',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <WaterIcon sx={{ color: a.status ? 'primary.main' : 'text.secondary' }} />
                <Box>
                  <Typography variant="body2">{a.name}</Typography>
                  <Chip
                    label={a.status ? 'ACTIVA' : 'INACTIVA'}
                    size="small"
                    color={a.status ? 'primary' : 'default'}
                    sx={{ fontSize: '0.6rem', height: 20, mt: 0.5 }}
                  />
                </Box>
              </Box>
              <Switch
                checked={a.status}
                onChange={() => handleToggle(a.id)}
                color="primary"
              />
            </Paper>
          ))}
        </Box>

        {/* Log de acciones */}
        <Paper>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" color="primary">
              Historial de acciones
            </Typography>
          </Box>
          <Divider sx={{ borderColor: '#1b2e1b' }} />
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ '& th': { color: 'text.secondary', borderBottom: '1px solid #1b2e1b' } }}>
                  <TableCell>Actuador</TableCell>
                  <TableCell>Acción</TableCell>
                  <TableCell>Usuario</TableCell>
                  <TableCell>Timestamp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {log.map((entry) => (
                  <TableRow
                    key={entry.id}
                    sx={{ '& td': { borderBottom: '1px solid #1b2e1b' }, '&:hover': { backgroundColor: '#0d1a0d' } }}
                  >
                    <TableCell>
                      <Typography variant="body2">{entry.actuator}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={entry.action}
                        size="small"
                        color={entry.action === 'ON' ? 'primary' : 'default'}
                        sx={{ fontSize: '0.6rem', height: 20 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">{entry.user}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                        {new Date(entry.timestamp).toLocaleString('es-MX')}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

      </Box>
    </Layout>
  )
}