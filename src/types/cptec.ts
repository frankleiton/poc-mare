// Tipos baseados nas respostas da API CPTEC/INPE via BrasilAPI
// https://brasilapi.com.br/docs#tag/CPTEC

/** Cidade retornada por GET /cptec/v1/cidade */
export interface Cidade {
  nome: string
  estado: string
  id: number
}

/** Previsão diária do tempo */
export interface ClimaDia {
  data: string // ISO yyyy-mm-dd
  condicao: string // código curto da condição (ex.: "pn", "c", "ec")
  condicao_desc: string // descrição legível
  min: number
  max: number
  indice_uv: number
}

/** Resposta de GET /cptec/v1/clima/previsao/{cityCode}/{days} */
export interface PrevisaoClima {
  cidade: string
  estado: string
  atualizado_em: string
  clima: ClimaDia[]
}

/** Bloco de medição de ondas em uma faixa de horário */
export interface DadoOnda {
  vento: number
  direcao_vento: string
  direcao_vento_desc?: string // ausente em direções compostas (ex.: "NNW")
  altura_onda: number
  direcao_onda: string
  direcao_onda_desc?: string
  agitation: string
  hora: string
}

/** Previsão de ondas para um dia */
export interface OndaDia {
  data: string // yyyy-mm-dd
  dados_ondas: DadoOnda[]
}

/** Resposta de GET /cptec/v1/ondas/{cityCode}/{days} */
export interface PrevisaoOndas {
  cidade: string
  estado: string
  atualizado_em: string
  ondas: OndaDia[]
}

/** Cidade selecionada e persistida pelo usuário */
export interface CidadeSelecionada {
  id: number
  nome: string
  estado: string
}

// Unidades de medida disponíveis no CPTEC. A API é inconsistente e às vezes retorna "MS" (metros por segundo) e às vezes "MKS" (sistema métrico, ou seja, m/s). Ambas significam a mesma coisa. "NOS" é nós e "KTS" é nós na escala Beaufort.
export type Unidade = 'MS' | 'NOS' | 'MKS' | 'KTS' | 'KMH'