import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Header from './Header'

export default function Layout() {
  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >
      <Header />
      <Container
        component="main"
        maxWidth="lg"
        sx={{ flexGrow: 1, py: { xs: 2, sm: 4 } }}
      >
        <Outlet />
      </Container>
      <Box
        component="footer"
        sx={{
          py: 2,
          textAlign: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Dados: CPTEC/INPE via{' '}
          <Link
            href="https://brasilapi.com.br/"
            target="_blank"
            rel="noopener"
          >
            BrasilAPI
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}
