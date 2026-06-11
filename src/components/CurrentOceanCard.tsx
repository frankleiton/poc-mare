import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import WavesIcon from '@mui/icons-material/Waves'
import AirIcon from '@mui/icons-material/Air'
import NavigationIcon from '@mui/icons-material/Navigation'
import HeightIcon from '@mui/icons-material/Height'
import ScheduleIcon from '@mui/icons-material/Schedule'
import type { OndaDia } from '@/types/cptec'
import { agitationColor, direcaoParaGraus } from '@/utils/weatherIcons'
import { formatarDataLonga } from '@/utils/format'

function DirecaoSeta({ direcao }: { direcao: string }) {
  const deg = direcaoParaGraus(direcao)
  return (
    <NavigationIcon
      fontSize="small"
      sx={{ transform: `rotate(${deg}deg)`, color: 'primary.main' }}
    />
  )
}

export default function CurrentOceanCard({ dia }: { dia: OndaDia }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ mb: 0.5 }}
        >
          <WavesIcon color="secondary" />
          <Typography variant="h6">Condições do mar — hoje</Typography>
        </Stack>
        <Typography variant="caption" color="text.secondary">
          {formatarDataLonga(dia.data)}
        </Typography>

        <Stack spacing={1.5} sx={{ mt: 2 }}>
          {dia.dados_ondas.map((onda, idx) => {
            const cor = agitationColor(onda.agitation)
            return (
              <Box
                key={`${onda.hora}-${idx}`}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '64px 1fr',
                    sm: '80px 1fr auto',
                  },
                  alignItems: 'center',
                  gap: 1.5,
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: 'action.hover',
                }}
              >
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <ScheduleIcon fontSize="small" color="action" />
                  <Typography variant="body2" fontWeight={600}>
                    {onda.hora}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ flexWrap: 'wrap', gap: 1 }}
                >
                  <Tooltip title="Altura da onda">
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <HeightIcon fontSize="small" sx={{ color: cor }} />
                      <Typography variant="body2">
                        {onda.altura_onda} m
                      </Typography>
                    </Stack>
                  </Tooltip>
                  <Tooltip
                    title={`Direção da onda: ${onda.direcao_onda_desc ?? onda.direcao_onda}`}
                  >
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <DirecaoSeta direcao={onda.direcao_onda} />
                      <Typography variant="body2">
                        {onda.direcao_onda}
                      </Typography>
                    </Stack>
                  </Tooltip>
                  <Tooltip
                    title={`Vento: ${onda.vento} m/s · ${onda.direcao_vento_desc ?? onda.direcao_vento}`}
                  >
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <AirIcon fontSize="small" color="action" />
                      <Typography variant="body2">
                        {onda.vento} m/s {onda.direcao_vento}
                      </Typography>
                    </Stack>
                  </Tooltip>
                </Stack>

                <Chip
                  size="small"
                  label={onda.agitation}
                  sx={{
                    color: cor,
                    bgcolor: `${cor}1a`,
                    fontWeight: 600,
                    justifySelf: { xs: 'start', sm: 'end' },
                    gridColumn: { xs: '2', sm: 'auto' },
                  }}
                />
              </Box>
            )
          })}
        </Stack>
      </CardContent>
    </Card>
  )
}
