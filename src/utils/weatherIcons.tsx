import type { SvgIconComponent } from '@mui/icons-material'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import WbCloudyIcon from '@mui/icons-material/WbCloudy'
import CloudIcon from '@mui/icons-material/Cloud'
import FilterDramaIcon from '@mui/icons-material/FilterDrama'
import ThunderstormIcon from '@mui/icons-material/Thunderstorm'
import GrainIcon from '@mui/icons-material/Grain'
import BeachAccessIcon from '@mui/icons-material/BeachAccess'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import BlurOnIcon from '@mui/icons-material/BlurOn'
import NightsStayIcon from '@mui/icons-material/NightsStay'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

export interface WeatherVisual {
  Icon: SvgIconComponent
  /** Cor associada à condição (hex). */
  color: string
}

/**
 * Mapeia o código de condição do CPTEC para um ícone do MUI e uma cor.
 * Os códigos seguem a tabela do INPE (ex.: "cl", "pn", "c", "t"...).
 */
export function weatherVisual(condicao: string): WeatherVisual {
  const code = condicao.trim().toLowerCase()

  // Céu limpo / predomínio de sol
  if (['cl', 'ps', 'pf'].includes(code)) {
    return { Icon: WbSunnyIcon, color: '#fbc02d' }
  }
  // Parcialmente nublado / variação de nebulosidade
  if (['pn', 'vn', 'pnt'].includes(code)) {
    return { Icon: FilterDramaIcon, color: '#90a4ae' }
  }
  // Nublado / encoberto
  if (['n', 'e', 'nd'].includes(code)) {
    return { Icon: CloudIcon, color: '#78909c' }
  }
  // Trovoadas / tempo instável
  if (['t', 'in', 'ch'].includes(code)) {
    return { Icon: ThunderstormIcon, color: '#5c6bc0' }
  }
  // Nevoeiro / névoa
  if (['nv', 'nf'].includes(code)) {
    return { Icon: BlurOnIcon, color: '#b0bec5' }
  }
  // Neve / geada
  if (['ne', 'g'].includes(code)) {
    return { Icon: AcUnitIcon, color: '#4fc3f7' }
  }
  // Noite (predomínio noturno sem chuva)
  if (code === 'cn') {
    return { Icon: NightsStayIcon, color: '#5c6bc0' }
  }
  // Chuva fraca / chuvisco
  if (['cv', 'cm', 'pcm', 'ppm', 'npm'].includes(code)) {
    return { Icon: GrainIcon, color: '#4dd0e1' }
  }
  // Pancadas / chuva (cobre a maioria dos códigos com "p" ou "c")
  if (code.startsWith('p') || code.startsWith('c') || code.startsWith('n')) {
    return { Icon: BeachAccessIcon, color: '#0288d1' }
  }
  // Nublado com aberturas (fallback genérico)
  if (code) {
    return { Icon: WbCloudyIcon, color: '#90a4ae' }
  }

  return { Icon: HelpOutlineIcon, color: '#bdbdbd' }
}

/** Classifica o índice UV em rótulo + cor. */
export function uvLevel(indiceUv: number): { label: string; color: string } {
  if (indiceUv <= 2) return { label: 'Baixo', color: '#43a047' }
  if (indiceUv <= 5) return { label: 'Moderado', color: '#fbc02d' }
  if (indiceUv <= 7) return { label: 'Alto', color: '#fb8c00' }
  if (indiceUv <= 10) return { label: 'Muito alto', color: '#e53935' }
  return { label: 'Extremo', color: '#8e24aa' }
}

// Rosa dos ventos de 16 pontos (+ variantes em português: O=W, NO=NW, SO=SW).
const GRAUS_DIRECAO: Record<string, number> = {
  N: 0, NNE: 22.5, NE: 45, ENE: 67.5,
  E: 90, ESE: 112.5, SE: 135, SSE: 157.5,
  S: 180, SSW: 202.5, SSO: 202.5, SW: 225, SO: 225, WSW: 247.5, OSO: 247.5,
  W: 270, O: 270, WNW: 292.5, ONO: 292.5, NW: 315, NO: 315, NNW: 337.5, NNO: 337.5,
}

/** Graus de rotação para uma sigla de direção (0 = Norte). */
export function direcaoParaGraus(direcao?: string): number {
  if (!direcao) return 0
  return GRAUS_DIRECAO[direcao.trim().toUpperCase()] ?? 0
}

/** Classifica a agitação marítima em cor. */
export function agitationColor(agitation: string): string {
  const a = agitation.trim().toLowerCase()
  if (a.includes('fraco')) return '#43a047'
  if (a.includes('moderado')) return '#fb8c00'
  if (a.includes('forte')) return '#e53935'
  return '#0288d1'
}
