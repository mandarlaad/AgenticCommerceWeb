import React from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import AppShell from './app/AppShell';
import { palette, typeScale, buttonTokens } from './lib/theme';

const muiTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: palette.primary
    },
    secondary: {
      main: palette.accent
    },
    background: {
      default: palette.paper
    },
    text: {
      primary: palette.ink,
      secondary: palette.muted
    }
  },
  shape: {
    borderRadius: 22
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
      fontWeight: 800,
      fontSize: typeScale.hero,
      lineHeight: 1.02,
      letterSpacing: '-0.04em'
    },
    h2: {
      fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
      fontWeight: 800,
      fontSize: typeScale.h1,
      lineHeight: 1.08,
      letterSpacing: '-0.03em'
    },
    h3: {
      fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
      fontWeight: 800,
      fontSize: typeScale.h2,
      lineHeight: 1.1,
      letterSpacing: '-0.025em'
    },
    h4: {
      fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
      fontWeight: 700,
      fontSize: typeScale.h3,
      lineHeight: 1.14
    },
    h5: {
      fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
      fontWeight: 700,
      fontSize: typeScale.title
    },
    body1: {
      fontSize: typeScale.bodyLg,
      lineHeight: 1.72,
      color: palette.text
    },
    body2: {
      fontSize: typeScale.body,
      lineHeight: 1.68,
      color: palette.muted
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
      fontSize: typeScale.body,
      letterSpacing: '-0.01em'
    },
    caption: {
      fontSize: typeScale.label,
      lineHeight: 1.45
    },
    overline: {
      fontSize: typeScale.label,
      fontWeight: 700,
      letterSpacing: '0.14em',
      textTransform: 'uppercase'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@import': 'url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap")',
        html: {
          fontSize: '16px'
        },
        body: {
          margin: 0,
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale'
        },
        '*': {
          boxSizing: 'border-box'
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 18,
          paddingBlock: 10,
          minHeight: 44
        },
        contained: {
          background: buttonTokens.neutral.bg,
          color: buttonTokens.neutral.color
        }
      }
    },
    MuiOutlinedButton: {
      styleOverrides: {
        root: {
          borderColor: palette.line
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          fontSize: typeScale.bodySm
        }
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          fontSize: typeScale.bodySm
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: typeScale.bodyLg
        }
      }
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          h4: 'h4',
          h5: 'h5'
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