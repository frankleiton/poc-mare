import { useQuery } from '@tanstack/react-query'
import {
  listarCidades,
  obterCidade,
  obterPrevisaoClima,
  obterPrevisaoOndas,
} from '@/api/cptec'

const UMA_HORA = 1000 * 60 * 60

/** Lista de cidades — quase imutável, cacheada por bastante tempo. */
export function useCidades() {
  return useQuery({
    queryKey: ['cidades'],
    queryFn: ({ signal }) => listarCidades(signal),
    staleTime: UMA_HORA * 24,
    gcTime: UMA_HORA * 24,
  })
}

/**
 * Busca cidades por nome diretamente na API. Usado como fallback quando a
 * cidade digitada não está na lista pré-carregada. Só dispara a partir de
 * 3 caracteres para evitar requisições desnecessárias.
 */
export function useCidade(cityName: string | null | undefined) {
  const termo = cityName?.trim() ?? ''
  return useQuery({
    queryKey: ['cidade', termo.toLowerCase()],
    queryFn: ({ signal }) => obterCidade(termo, signal),
    enabled: termo.length >= 3,
    staleTime: UMA_HORA,
  })
}

/** Previsão do tempo (hoje + próximos dias) para a cidade selecionada. */
export function usePrevisaoClima(cityCode: number | null | undefined, dias = 6) {
  return useQuery({
    queryKey: ['clima', cityCode, dias],
    queryFn: ({ signal }) => obterPrevisaoClima(cityCode as number, dias, signal),
    enabled: cityCode != null,
    staleTime: UMA_HORA,
  })
}

/**
 * Previsão oceânica. Cidades sem litoral retornam erro da API —
 * desativamos o retry para falhar rápido e exibir aviso amigável.
 */
export function usePrevisaoOndas(cityCode: number | null | undefined, dias = 6) {
  return useQuery({
    queryKey: ['ondas', cityCode, dias],
    queryFn: ({ signal }) => obterPrevisaoOndas(cityCode as number, dias, signal),
    enabled: cityCode != null,
    staleTime: UMA_HORA,
    retry: 1,
  })
}
