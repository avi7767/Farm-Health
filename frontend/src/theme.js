import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#388e3c', // Deep green
      light: '#66bb6a',
      dark: '#1b5e20',
      contrastText: '#ffffff', // White text on primary color
    },
    secondary: {
      main: '#8d6e63', // Earth brown
      light: '#bcaaa4',
      dark: '#5f4339',
      contrastText: '#ffffff', // White text on secondary color
    },
    background: {
      default: 'transparent', // Ensure main background is transparent to see image
      paper: '#ffffff',   // White card background for readability
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)', // Default dark text
      secondary: 'rgba(0, 0, 0, 0.6)', // Default secondary text
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)',
      selected: 'rgba(0, 0, 0, 0.08)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      color: '#ffffff',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      color: '#ffffff',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      color: '#ffffff',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.5rem',
      color: '#ffffff',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
      color: '#ffffff',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
      color: '#ffffff',
    },
    subtitle1: {
      color: '#ffffff',
    },
    subtitle2: {
      color: '#ffffff',
    },
    body1: {
      color: 'rgba(0, 0, 0, 0.87)',
    },
    body2: {
      color: 'rgba(0, 0, 0, 0.87)',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      color: 'rgba(0, 0, 0, 0.87)',
    },
    caption: {
      color: 'rgba(0, 0, 0, 0.6)',
    },
    overline: {
      color: 'rgba(0, 0, 0, 0.6)',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: 'url("/background.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundColor: 'transparent',
          '&::before': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: -1,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          transition: 'all 0.3s ease',
          color: 'rgba(0, 0, 0, 0.87)',
          backdropFilter: 'none',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(56,142,60,0.15)',
          },
        },
        contained: {
          boxShadow: '0 2px 4px rgba(56,142,60,0.10)',
          '&:hover': {
            backgroundColor: '#2e7d32',
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: '#ffffff',
          backdropFilter: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.10)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.18)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#388e3c',
          backdropFilter: 'none',
          color: '#ffffff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
          backdropFilter: 'none',
          color: 'rgba(0, 0, 0, 0.87)',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#1976d2',
          '&:hover': {
            color: '#2196f3',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          color: 'rgba(0, 0, 0, 0.87)',
          backdropFilter: 'none',
          backgroundColor: '#e0e0e0',
        },
        outlined: {
          borderColor: 'rgba(0, 0, 0, 0.23)',
          color: 'rgba(0, 0, 0, 0.87)',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'rgba(0, 0, 0, 0.6)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: 'rgba(0, 0, 0, 0.87)',
          backgroundColor: '#ffffff',
          backdropFilter: 'none',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.87)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1976d2',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'none',
          backgroundColor: '#ffffff',
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme; 