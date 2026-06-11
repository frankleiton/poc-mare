import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import PlaceIcon from '@mui/icons-material/Place'
import ThermostatIcon from '@mui/icons-material/Thermostat'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import UpdateIcon from '@mui/icons-material/Update'
import type { PrevisaoClima } from '@/types/cptec'
import { weatherVisual, uvLevel } from '@/utils/weatherIcons'
import { formatarDataLonga } from '@/utils/format'

export default function CurrentWeatherCard({
  previsao,
}: {
  previsao: PrevisaoClima
}) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const hoje = previsao.clima[0]
  if (!hoje) return null

  const { Icon, color } = weatherVisual(hoje.condicao)
  const uv = uvLevel(hoje.indice_uv)

  return (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 60%, ${theme.palette.primary.light} 100%)`,
        color: 'common.white',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, sm: 4 } }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ opacity: 0.9 }}
        >
          <PlaceIcon fontSize="small" />
          <Typography variant="subtitle1" fontWeight={600}>
            {previsao.cidade} — {previsao.estado}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
          {formatarDataLonga(hoje.data)} · Tempo atual
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={{ xs: 1, sm: 3 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Icon sx={{ fontSize: isMobile ? 64 : 88, color }} />
            <Box>
              <Typography
                variant={isMobile ? 'h3' : 'h2'}
                fontWeight={700}
                lineHeight={1}
              >
                {hoje.max}°
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.85 }}>
                máxima do dia
              </Typography>
            </Box>
          </Box>

          <Divider
            flexItem
            orientation={isMobile ? 'horizontal' : 'vertical'}
            sx={{ borderColor: 'rgba(255,255,255,0.3)' }}
          />

          <Box>
            <Typography variant="h6">{hoje.condicao_desc}</Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <ArrowUpwardIcon fontSize="small" />
                <Typography>{hoje.max}°</Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <ArrowDownwardIcon fontSize="small" />
                <Typography>{hoje.min}°</Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{ mt: 3, flexWrap: 'wrap', gap: 1 }}
        >
          <Chip
            icon={<ThermostatIcon />}
            label={`Mín ${hoje.min}° / Máx ${hoje.max}°`}
            sx={chipSx}
          />
          <Chip
            icon={<WbSunnyIcon />}
            label={`UV ${hoje.indice_uv} · ${uv.label}`}
            sx={{ ...chipSx, '& .MuiChip-icon': { color: uv.color } }}
          />
          <Chip
            icon={<UpdateIcon />}
            label={`Atualizado: ${previsao.atualizado_em}`}
            sx={chipSx}
          />
        </Stack>
      </CardContent>
    </Card>
  )
}

const chipSx = {
  color: 'common.white',
  bgcolor: 'rgba(255,255,255,0.16)',
  '& .MuiChip-icon': { color: 'common.white' },
}
