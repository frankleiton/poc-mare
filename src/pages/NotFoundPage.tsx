import { Link as RouterLink } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import HomeIcon from '@mui/icons-material/Home'
import SearchOffIcon from '@mui/icons-material/SearchOff'

export default function NotFoundPage() {
  return (
    <Stack alignItems="center" spacing={2} sx={{ py: 8, textAlign: 'center' }}>
      <SearchOffIcon sx={{ fontSize: 72, color: 'text.disabled' }} />
      <Typography variant="h4">Página não encontrada</Typography>
      <Typography color="text.secondary">
        A rota que você tentou acessar não existe.
      </Typography>
      <Button
        component={RouterLink}
        to="/"
        variant="contained"
        startIcon={<HomeIcon />}
      >
        Voltar ao início
      </Button>
    </Stack>
  )
}
