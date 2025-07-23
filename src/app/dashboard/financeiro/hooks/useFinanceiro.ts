import { createFetchWithFiltersHook } from '@/hooks/createFetchWithFiltersHook'
import { FinanceiroService } from '@/services/FinanceiroService'
import type { FinanceiroListarAgrupamento } from '@/types/fincanceiro'
import { formatDateOnly } from '@/utils/formatDateOnly'

type FinanceiroFiltro = {
  Data_Inicio: string
  Data_Fim: string
  Coluna_Agrupamento: 'empresadoc' | 'razaosocialps' | 'descricaoformapagto' | 'empresar' | 'centrocusto' | 'moeda' | 'idplanocontas' | 'debito' | 'ano' | 'mes' | 'dia'
  Coluna_Filtro?: string
  Valor_Filtro?: string
}

export const useFinanceiroGrafico = createFetchWithFiltersHook<FinanceiroListarAgrupamento[], FinanceiroFiltro>({
  initialFilters: {
    Data_Inicio: formatDateOnly(new Date(new Date().setFullYear(new Date().getFullYear() - 1))),
    Data_Fim: formatDateOnly(new Date()),
    Coluna_Agrupamento: 'empresadoc'
  },
  fetcher: async (filters) => {
    const result = await FinanceiroService.getFinanceiroListarAgrupamento(filters)

    return Array.isArray(result) ? result : [result]
  }
})
