import type {
  Cidade,
  PrevisaoClima,
  PrevisaoOndas,
} from '@/types/cptec'

const BASE_URL = 'https://brasilapi.com.br/api/cptec/v1'

/** Erro de domínio para falhas vindas da API. */
export class CptecApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message)
    this.name = 'CptecApiError'
  }
}

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  let response: Response
  try {
    response = await fetch(`${BASE_URL}${path}`, { signal })
  } catch (err) {
    if ((err as Error).name === 'AbortError') throw err
    throw new CptecApiError(
      'Não foi possível conectar à BrasilAPI. Verifique sua conexão.',
    )
  }

  if (!response.ok) {
    throw new CptecApiError(
      `Falha ao consultar a BrasilAPI (HTTP ${response.status}).`,
      response.status,
    )
  }

  return (await response.json()) as T
}

/** Lista todas as cidades disponíveis no CPTEC. */
export function listarCidades(signal?: AbortSignal): Promise<Cidade[]> {
  return request<Cidade[]>('/cidade', signal)
}

/**
 * Busca cidades pelo nome. A API pode retornar várias correspondências
 * (ex.: "Rio Branco" existe em AC e MT). Retorna `[]` quando nada é encontrado.
 */
export async function obterCidade(
  cityName: string,
  signal?: AbortSignal,
): Promise<Cidade[]> {
  try {
    return await request<Cidade[]>(
      `/cidade/${encodeURIComponent(cityName)}`,
      signal,
    )
  } catch (err) {
    if (err instanceof CptecApiError && err.status === 404) {
      return []
    }
    throw err
  }
}

/**
 * Previsão do tempo para os próximos `dias` dias (1 a 6).
 * Inclui o dia atual.
 */
export function obterPrevisaoClima(
  cityCode: number,
  dias = 6,
  signal?: AbortSignal,
): Promise<PrevisaoClima> {
  const clamped = Math.min(Math.max(dias, 1), 6)
  return request<PrevisaoClima>(
    `/clima/previsao/${cityCode}/${clamped}`,
    signal,
  )
}

/**
 * Previsão oceânica (ondas) para os próximos `dias` dias (1 a 6).
 * Disponível apenas para cidades litorâneas.
 */
export function obterPrevisaoOndas(
  cityCode: number,
  dias = 6,
  signal?: AbortSignal,
): Promise<PrevisaoOndas> {
  const clamped = Math.min(Math.max(dias, 1), 6)
  return request<PrevisaoOndas>(`/ondas/${cityCode}/${clamped}`, signal)
}
