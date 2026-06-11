const DIAS_SEMANA = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
]

const MESES = [
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dez',
]

/** Converte "yyyy-mm-dd" (clima) ou "dd/mm/yyyy" (ondas) em Date. */
function parseData(data: string): Date | null {
  if (/^\d{4}-\d{2}-\d{2}/.test(data)) {
    const [y, m, d] = data.slice(0, 10).split('-').map(Number)
    return new Date(y, m - 1, d)
  }
  if (/^\d{2}\/\d{2}\/\d{4}/.test(data)) {
    const [d, m, y] = data.slice(0, 10).split('/').map(Number)
    return new Date(y, m - 1, d)
  }
  return null
}

/** Ex.: "Quarta, 11 jun". */
export function formatarDataLonga(data: string): string {
  const date = parseData(data)
  if (!date) return data
  return `${DIAS_SEMANA[date.getDay()]}, ${date.getDate()} ${MESES[date.getMonth()]}`
}

/** Ex.: "Qua 11/06". */
export function formatarDataCurta(data: string): string {
  const date = parseData(data)
  if (!date) return data
  const dia = DIAS_SEMANA[date.getDay()].slice(0, 3)
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  return `${dia} ${dd}/${mm}`
}

/** Indica se a data corresponde a hoje. */
export function ehHoje(data: string): boolean {
  const date = parseData(data)
  if (!date) return false
  const hoje = new Date()
  return (
    date.getDate() === hoje.getDate() &&
    date.getMonth() === hoje.getMonth() &&
    date.getFullYear() === hoje.getFullYear()
  )
}
