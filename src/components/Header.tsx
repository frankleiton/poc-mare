import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { alpha, useTheme } from '@mui/material/styles'
import WavesIcon from '@mui/icons-material/Waves'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useLocation } from '@/context/LocationContext'
import CitySelector from './CitySelector'

export default function Header() {
  const theme = useTheme()
  const { cidade, definirCidade, limparCidade } = useLocation()

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: alpha(theme.palette.primary.dark, 0.96),
        backdropFilter: 'blur(6px)',
        borderBottom: `1px solid ${alpha('#fff', 0.12)}`,
      }}
    >
      <Toolbar sx={{ gap: 2, flexWrap: { xs: 'wrap', sm: 'nowrap' }, py: 1 }}>
        <Stack direction="row" alignItems="center" spacing={1.2}>
          <WavesIcon />
          <Box>
            <Typography variant="h6" lineHeight={1} fontWeight={700}>
              Mare
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              Tempo & Oceano
            </Typography>
          </Box>
        </Stack>

        <Box sx={{ flexGrow: 1, minWidth: { xs: '100%', sm: 'auto' } }} />

        {/* Seletor de cidade no menu superior */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            width: { xs: '100%', sm: 'auto' },
            '& .MuiOutlinedInput-root': {
              bgcolor: alpha('#fff', 0.14),
              color: 'common.white',
            },
            '& .MuiInputLabel-root, & .MuiSvgIcon-root': {
              color: alpha('#fff', 0.85),
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha('#fff', 0.3),
            },
          }}
        >
          <CitySelector
            value={cidade}
            onChange={(c) => c && definirCidade(c)}
            label="Trocar cidade"
            dense
            fullWidth={false}
          />
          {cidade && (
            <Tooltip title="Limpar cidade salva">
              <IconButton
                color="inherit"
                onClick={limparCidade}
                size="small"
                aria-label="limpar cidade"
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
