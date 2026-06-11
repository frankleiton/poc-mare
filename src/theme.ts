import { createTheme } from '@mui/material/styles'
import { ptBR } from '@mui/material/locale'

/** Tema MUI com paleta inspirada em céu/oceano e tipografia Roboto. */
export const theme = createTheme(
  {
    palette: {
      mode: 'light',
      primary: { main: '#0277bd', light: '#58a5f0', dark: '#004c8c' },
      secondary: { main: '#00897b' },
      background: { default: '#eef4f8', paper: '#ffffff' },
    },
    shape: { borderRadius: 14 },
    typography: {
      fontFamily: 'Roboto, system-ui, Avenir, Helvetica, Arial, sans-serif',
      h4: { fontWeight: 700 },
      h6: { fontWeight: 600 },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: '0 6px 24px rgba(2, 119, 189, 0.08)',
          },
        },
      },
      MuiAppBar: {
        defaultProps: { elevation: 0 },
      },
    },
  },
  ptBR,
)
