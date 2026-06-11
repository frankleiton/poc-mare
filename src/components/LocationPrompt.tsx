import { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import CheckIcon from '@mui/icons-material/Check'
import { useLocation } from '@/context/LocationContext'
import type { CidadeSelecionada } from '@/types/cptec'
import CitySelector from './CitySelector'

export default function LocationPrompt() {
  const { definirCidade } = useLocation()
  const [escolha, setEscolha] = useState<CidadeSelecionada | null>(null)

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
      }}
    >
      <Card sx={{ maxWidth: 520, width: '100%' }}>
        <CardContent sx={{ p: { xs: 3, sm: 5 }, textAlign: 'center' }}>
          <TravelExploreIcon color="primary" sx={{ fontSize: 64, mb: 1 }} />
          <Typography variant="h4" gutterBottom>
            Bem-vindo ao Mare
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Escolha sua localidade para ver o tempo atual, a previsão dos
            próximos dias e as condições do mar. Vamos lembrar dela nos
            próximos acessos.
          </Typography>

          <Stack spacing={2}>
            <CitySelector
              value={escolha}
              onChange={setEscolha}
              label="Sua cidade"
              autoFocus
            />
            <Button
              variant="contained"
              size="large"
              disabled={!escolha}
              startIcon={<CheckIcon />}
              onClick={() => escolha && definirCidade(escolha)}
            >
              Confirmar localidade
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}
