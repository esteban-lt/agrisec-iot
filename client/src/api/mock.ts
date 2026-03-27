// src/api/mock.ts
// Datos falsos que simulan las respuestas del backend
// Cuando la API real esté lista, este archivo ya no se usará

export const MOCK_USERS = [
  {
    id: 1,
    email: 'productor@agrisec.mx',
    password: '1234',
    role: 'PRODUCTOR',
    name: 'Axel Holguin',
  },
  {
    id: 2,
    email: 'operador@agrisec.mx',
    password: '1234',
    role: 'OPERADOR',
    name: 'Esteban Ledezma',
  },
]

export const MOCK_READINGS = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  node_id: `NODO-${(i % 3) + 1}`,
  temperature: parseFloat((Math.random() * 30 + 5).toFixed(1)),
  humidity: parseFloat((Math.random() * 80 + 10).toFixed(1)),
  timestamp: new Date(Date.now() - i * 60000 * 15).toISOString(),
  is_anomaly: i === 4 || i === 11 || i === 22, // 3 lecturas anómalas
}))

export const MOCK_ACTUATORS = [
  { id: 1, name: 'Bomba Sector A', status: false },
  { id: 2, name: 'Bomba Sector B', status: true },
  { id: 3, name: 'Bomba Sector C', status: false },
]

export const MOCK_ACTUATOR_LOG = [
  { id: 1, actuator: 'Bomba Sector B', action: 'ON',  user: 'productor@agrisec.mx', timestamp: new Date(Date.now() - 3600000).toISOString() },
  { id: 2, actuator: 'Bomba Sector A', action: 'OFF', user: 'productor@agrisec.mx', timestamp: new Date(Date.now() - 7200000).toISOString() },
  { id: 3, actuator: 'Bomba Sector C', action: 'ON',  user: 'productor@agrisec.mx', timestamp: new Date(Date.now() - 10800000).toISOString() },
]