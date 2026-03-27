// src/pages/DashboardPage.tsx
import { Box, Typography, Paper, Grid, Chip } from '@mui/material'
import SensorsIcon from '@mui/icons-material/Sensors'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import WaterIcon from '@mui/icons-material/Water'
import ThermostatIcon from '@mui/icons-material/Thermostat'
import Layout from '../components/Layout'
import { useAuth } from '../auth/AuthContext'
import { MOCK_READINGS, MOCK_ACTUATORS } from '../api/mock'

export default function DashboardPage() {
  const { user } = useAuth()

  // Calcular resumen
  const totalReadings = MOCK_READINGS.length
  const anomalies = MOCK_READINGS.filter((r) => r.is_anomaly)
  const lastReading = MOCK_READINGS[0]
  const activePumps = MOCK_ACTUATORS.filter((a) => a.status).length

  return (
    <Layout>
      <Box sx={{ maxWidth: 1000 }}>

        {/* Encabezado */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" color="primary" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bienvenido, {user?.name} —{' '}
            <Chip
              label={user?.role}
              size="small"
              color={user?.role === 'PRODUCTOR' ? 'primary' : 'default'}
              sx={{ fontSize: '0.65rem' }}
            />
          </Typography>
        </Box>

        {/* Tarjetas de resumen */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <SensorsIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">Lecturas totales</Typography>
              </Box>
              <Typography variant="h4" color="primary">{totalReadings}</Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper sx={{ p: 2.5, border: anomalies.length > 0 ? '1px solid #f44336' : undefined }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <WarningAmberIcon sx={{ color: anomalies.length > 0 ? 'error.main' : 'text.secondary', fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">Anomalías</Typography>
              </Box>
              <Typography variant="h4" color={anomalies.length > 0 ? 'error' : 'primary'}>
                {anomalies.length}
              </Typography>
              {/* Alerta extra solo para el Productor */}
              {user?.role === 'PRODUCTOR' && anomalies.length > 0 && (
                <Typography variant="body2" color="error" sx={{ mt: 1, fontSize: '0.7rem' }}>
                  ⚠ Revisar lecturas anómalas
                </Typography>
              )}
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <ThermostatIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">Última temp.</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {lastReading.temperature}°C
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                {lastReading.node_id}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <WaterIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">Bombas activas</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {activePumps}/{MOCK_ACTUATORS.length}
              </Typography>
            </Paper>
          </Grid>

        </Grid>

        {/* Últimas lecturas */}
        <Paper sx={{ p: 2.5 }}>
          <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
            Últimas 5 lecturas
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {MOCK_READINGS.slice(0, 5).map((r) => (
              <Box key={r.id} sx={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
                p: 1.5, borderRadius: 1,
                backgroundColor: r.is_anomaly ? '#1a0a0a' : '#0d1a0d',
                border: r.is_anomaly ? '1px solid #f44336' : '1px solid #1b2e1b',
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="body2" color="text.secondary">{r.node_id}</Typography>
                  <Typography variant="body2">{r.temperature}°C</Typography>
                  <Typography variant="body2">{r.humidity}%</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {r.is_anomaly && (
                    <Chip label="ANOMALÍA" size="small" color="error" sx={{ fontSize: '0.6rem', height: 20 }} />
                  )}
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                    {new Date(r.timestamp).toLocaleTimeString('es-MX')}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>

      </Box>
    </Layout>
  )
}