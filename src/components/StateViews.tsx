import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import RefreshIcon from '@mui/icons-material/Refresh'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

export function LoadingView({ label = 'Carregando...' }: { label?: string }) {
  return (
    <Stack alignItems="center" justifyContent="center" spacing={2} sx={{ py: 6 }}>
      <CircularProgress />
      <Typography color="text.secondary">{label}</Typography>
    </Stack>
  )
}

interface MessageViewProps {
  icon?: ReactNode
  title: string
  description?: string
  onRetry?: () => void
}

export function ErrorView({
  title,
  description,
  onRetry,
}: Omit<MessageViewProps, 'icon'>) {
  return (
    <Stack alignItems="center" spacing={1.5} sx={{ py: 6, textAlign: 'center' }}>
      <ErrorOutlineIcon color="error" sx={{ fontSize: 48 }} />
      <Typography variant="h6">{title}</Typography>
      {description && (
        <Typography color="text.secondary" sx={{ maxWidth: 420 }}>
          {description}
        </Typography>
      )}
      {onRetry && (
        <Button
          startIcon={<RefreshIcon />}
          variant="outlined"
          onClick={onRetry}
          sx={{ mt: 1 }}
        >
          Tentar novamente
        </Button>
      )}
    </Stack>
  )
}

export function InfoView({ title, description }: Omit<MessageViewProps, 'icon' | 'onRetry'>) {
  return (
    <Box
      sx={{
        py: 4,
        px: 3,
        textAlign: 'center',
        color: 'text.secondary',
        borderRadius: 3,
        bgcolor: 'action.hover',
      }}
    >
      <InfoOutlinedIcon sx={{ fontSize: 40, mb: 1, opacity: 0.7 }} />
      <Typography variant="subtitle1" color="text.primary" gutterBottom>
        {title}
      </Typography>
      {description && <Typography variant="body2">{description}</Typography>}
    </Box>
  )
}
