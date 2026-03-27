// src/components/Layout.tsx
// Navbar + contenedor que envuelve todas las páginas protegidas

import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  AppBar, Toolbar, Typography, Box, Drawer, List,
  ListItem, ListItemButton, ListItemIcon, ListItemText,
  IconButton, Chip, Divider, Tooltip
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import SensorsIcon from '@mui/icons-material/Sensors'
import WaterIcon from '@mui/icons-material/Water'
import LogoutIcon from '@mui/icons-material/Logout'
import AgricultureIcon from '@mui/icons-material/Agriculture'
import MenuIcon from '@mui/icons-material/Menu'
import { useAuth } from '../auth/AuthContext'

const DRAWER_WIDTH = 220

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { label: 'Lecturas', path: '/readings', icon: <SensorsIcon /> },
    // Solo el Productor ve Actuadores
    ...(user?.role === 'PRODUCTOR'
      ? [{ label: 'Actuadores', path: '/actuators', icon: <WaterIcon /> }]
      : []),
  ]

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <AgricultureIcon sx={{ color: 'primary.main' }} />
        <Typography variant="h6" color="primary">AgriSec</Typography>
      </Box>

      <Divider sx={{ borderColor: '#1b2e1b' }} />

      {/* Usuario y rol */}
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary" noWrap>
          {user?.name}
        </Typography>
        <Chip
          label={user?.role}
          size="small"
          color={user?.role === 'PRODUCTOR' ? 'primary' : 'default'}
          sx={{ mt: 0.5, fontSize: '0.65rem' }}
        />
      </Box>

      <Divider sx={{ borderColor: '#1b2e1b' }} />

      {/* Navegación */}
      <List sx={{ flex: 1, pt: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => { navigate(item.path); setMobileOpen(false) }}
              sx={{
                mx: 1, borderRadius: 1,
                '&.Mui-selected': {
                  backgroundColor: '#0d2e0d',
                  borderLeft: '3px solid #4caf50',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: location.pathname === item.path ? 'primary.main' : 'text.secondary' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Logout */}
      <Divider sx={{ borderColor: '#1b2e1b' }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout} sx={{ mx: 1, borderRadius: 1 }}>
            <ListItemIcon sx={{ minWidth: 36, color: 'error.main' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Cerrar sesión"
              primaryTypographyProps={{ variant: 'body2', color: 'error' }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* AppBar móvil */}
      <AppBar position="fixed" sx={{ display: { md: 'none' }, backgroundColor: '#111811' }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => setMobileOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="primary" sx={{ ml: 1 }}>AgriSec IoT</Typography>
          <Box sx={{ flex: 1 }} />
          <Tooltip title="Cerrar sesión">
            <IconButton color="error" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Drawer desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: DRAWER_WIDTH,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            backgroundColor: '#111811',
            borderRight: '1px solid #1b2e1b',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Drawer móvil */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            backgroundColor: '#111811',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Contenido principal */}
      <Box component="main" sx={{
        flex: 1,
        p: 3,
        mt: { xs: 8, md: 0 },
        ml: { md: `${DRAWER_WIDTH}px` },
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}>
        {children}
      </Box>
    </Box>
  )
}