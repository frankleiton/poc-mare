import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import SailingIcon from '@mui/icons-material/Sailing'
import WavesIcon from '@mui/icons-material/Waves'
import AirIcon from '@mui/icons-material/Air'
import NavigationIcon from '@mui/icons-material/Navigation'
import type { OndaDia, DadoOnda } from '@/types/cptec'
import { agitationColor, direcaoParaGraus } from '@/utils/weatherIcons'
import { formatarDataCurta } from '@/utils/format'
import SectionHeader from './SectionHeader'

const ORDEM_AGITACAO = ['fraco', 'moderado', 'forte', 'muito forte']

/** Resume um dia: maior onda + agitação mais severa + vento médio. */
function resumoDia(dia: OndaDia) {
  const dados = dia.dados_ondas
  if (dados.length === 0) return null

  const alturaMax = Math.max(...dados.map((d) => d.altura_onda))
  const ventoMedio =
    dados.reduce((acc, d) => acc + d.vento, 0) / dados.length

  const maisSevero = dados.reduce<DadoOnda>((pior, atual) => {
    const ip = ORDEM_AGITACAO.indexOf(pior.agitation.toLowerCase())
    const ia = ORDEM_AGITACAO.indexOf(atual.agitation.toLowerCase())
    return ia > ip ? atual : pior
  }, dados[0])

  return {
    alturaMax,
    ventoMedio: Math.round(ventoMedio * 10) / 10,
    agitacao: maisSevero.agitation,
    direcaoOnda: maisSevero.direcao_onda,
  }
}

export default function OceanForecastSection({ dias }: { dias: OndaDia[] }) {
  const proximos = dias.slice(1, 6)
  if (proximos.length === 0) return null

  return (
    <Box>
      <SectionHeader
        icon={<SailingIcon color="secondary" />}
        title="Mar nos próximos 5 dias"
        subtitle="Previsão oceânica"
      />
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(5, 1fr)',
          },
        }}
      >
        {proximos.map((dia) => {
          const resumo = resumoDia(dia)
          if (!resumo) return null
          const cor = agitationColor(resumo.agitacao)
          const deg = direcaoParaGraus(resumo.direcaoOnda)
          return (
            <Card key={dia.data} variant="outlined">
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 1,
                  '&:last-child': { pb: 2 },
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  {formatarDataCurta(dia.data)}
                </Typography>
                <WavesIcon sx={{ fontSize: 40, color: cor }} />
                <Typography variant="h6" lineHeight={1}>
                  {resumo.alturaMax} m
                </Typography>
                <Chip
                  size="small"
                  label={resumo.agitacao}
                  sx={{ color: cor, bgcolor: `${cor}1a`, fontWeight: 600 }}
                />
                <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                  <Stack direction="row" spacing={0.25} alignItems="center">
                    <AirIcon sx={{ fontSize: 16 }} color="action" />
                    <Typography variant="caption">
                      {resumo.ventoMedio} m/s
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.25} alignItems="center">
                    <NavigationIcon
                      sx={{
                        fontSize: 16,
                        color: 'primary.main',
                        transform: `rotate(${deg}deg)`,
                      }}
                    />
                    <Typography variant="caption">
                      {resumo.direcaoOnda}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          )
        })}
      </Box>
    </Box>
  )
}
