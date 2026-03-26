import { useState } from 'react'
import {
  Box, Typography, Paper, Chip,
  MenuItem, Select, FormControl, InputLabel,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TablePagination
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import { MOCK_READINGS } from '../api/mock'
import Layout from '../components/Layout'

export default function ReadingsPage() {
  const [page, setPage] = useState(0)
  const [rowsPerPage] = useState(10)
  const [filterNode, setFilterNode] = useState('TODOS')

  const nodes = ['TODOS', 'NODO-1', 'NODO-2', 'NODO-3']

  const filtered = filterNode === 'TODOS'
    ? MOCK_READINGS
    : MOCK_READINGS.filter((r) => r.node_id === filterNode)

  const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const handleNodeChange = (e: SelectChangeEvent) => {
    setFilterNode(e.target.value)
    setPage(0)
  }

  return (
    <Layout>
      <Box sx={{ maxWidth: 1000 }}>

        {/* Encabezado */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" color="primary" gutterBottom>
            Lecturas de sensores
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Historial de lecturas de temperatura y humedad por nodo
          </Typography>
        </Box>

        {/* Filtro */}
        <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Filtrar por nodo</InputLabel>
            <Select value={filterNode} label="Filtrar por nodo" onChange={handleNodeChange}>
              {nodes.map((n) => (
                <MenuItem key={n} value={n}>{n}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography variant="body2" color="text.secondary">
            {filtered.length} lecturas encontradas
          </Typography>
        </Box>

        {/* Tabla */}
        <Paper>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ '& th': { color: 'text.secondary', borderBottom: '1px solid #1b2e1b' } }}>
                  <TableCell>ID</TableCell>
                  <TableCell>Nodo</TableCell>
                  <TableCell>Temperatura</TableCell>
                  <TableCell>Humedad</TableCell>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginated.map((r) => (
                  <TableRow
                    key={r.id}
                    sx={{
                      backgroundColor: r.is_anomaly ? '#1a0a0a' : 'transparent',
                      '& td': { borderBottom: '1px solid #1b2e1b' },
                      '&:hover': { backgroundColor: r.is_anomaly ? '#220d0d' : '#0d1a0d' },
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">#{r.id}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{r.node_id}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{r.temperature}°C</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{r.humidity}%</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                        {new Date(r.timestamp).toLocaleString('es-MX')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {r.is_anomaly
                        ? <Chip label="ANOMALÍA" size="small" color="error" sx={{ fontSize: '0.6rem', height: 20 }} />
                        : <Chip label="Normal" size="small" sx={{ fontSize: '0.6rem', height: 20, backgroundColor: '#0d2e0d', color: '#4caf50' }} />
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={filtered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10]}
            onPageChange={(_, newPage) => setPage(newPage)}
            sx={{ borderTop: '1px solid #1b2e1b', color: 'text.secondary' }}
          />
        </Paper>

      </Box>
    </Layout>
  )
}