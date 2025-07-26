import { create } from 'zustand'

import type { FinanceiroListarAgrupamento } from '@/types/fincanceiro'


interface FinanceiroState {
  financeiroListarAgrupamento: FinanceiroListarAgrupamento[]
  setFinanceiroListarAgrupamento: (financeirosListarAgrupamento: FinanceiroListarAgrupamento[]) => void

  
}

const useFinanceiroListarAgrupamentoStore = create<FinanceiroState>((set) => ({
  financeiroListarAgrupamento: [],
  setFinanceiroListarAgrupamento: (financeirosListarAgrupamento: FinanceiroListarAgrupamento[]) =>
    set(() => ({
      financeiroListarAgrupamento: financeirosListarAgrupamento,
    })),
}))


export default useFinanceiroListarAgrupamentoStore
