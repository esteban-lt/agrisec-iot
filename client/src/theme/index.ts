import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4caf50',       // verde campo
      light: '#80e27e',
      dark: '#087f23',
    },
    secondary: {
      main: '#ff8f00',       // ámbar para alertas
    },
    background: {
      default: '#0a0f0a',    // negro casi verdoso
      paper: '#111811',
    },
    error: {
      main: '#f44336',
    },
    text: {
      primary: '#e8f5e9',
      secondary: '#81c784',
    },
  },
  typography: {
    fontFamily: '"IBM Plex Mono", "Courier New", monospace',
    h4: { fontWeight: 700, letterSpacing: '0.05em' },
    h6: { fontWeight: 600 },
    body2: { fontFamily: '"IBM Plex Sans", sans-serif' },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid #1b2e1b',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: '"IBM Plex Mono", monospace',
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;