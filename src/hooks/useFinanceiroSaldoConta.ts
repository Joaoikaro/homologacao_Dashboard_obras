import { useQuery } from "@tanstack/react-query"

import useSaldoContaStore from "@/store/financeiroSaldoContaStore"
import type { FinanceiroSaldoContaResponse } from "@/types/financeiroSaldoConta"
import { httpClient } from "@/services/httpClient"

export function useFinanceiroSaldoConta() {
  const { saldoConta, setSaldoConta } = useSaldoContaStore()

  const saldoContaQuery = useQuery({
    queryKey: ['financeiroSaldoConta'],
    queryFn: async (): Promise<FinanceiroSaldoContaResponse[]> => {
      const response = await httpClient.get<FinanceiroSaldoContaResponse[]>('/v1/dashboard_financeiro_saldo_conta/listar');

      setSaldoConta(response.data);

      return response.data;
    },
  })

  return {
    saldoConta,
    saldoContaQuery,
  }
}
