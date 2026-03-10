import React from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import AppShell from './app/AppShell';
import { palette } from './lib/theme';

const muiTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: palette.teal
    },
    secondary: {
      main: palette.ember
    },
    background: {
      default: palette.paper
    },
    text: {
      primary: palette.ink
    }
  },
  shape: {
    borderRadius: 18
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Trebuchet MS", Arial, sans-serif',
    h1: {
      fontWeight: 700
    },
    h2: {
      fontWeight: 700
    },
    h3: {
      fontWeight: 700
    },
    button: {
      textTransform: 'none',
      fontWeight: 600
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0
        },
        '*': {
          boxSizing: 'border-box'
        }
      }
    }
  }
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <AppShell />
    </ThemeProvider>
  </React.StrictMode>
);