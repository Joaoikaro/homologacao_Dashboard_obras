import { create } from 'zustand'

import type { FinanceiroSaldoContaResponse } from '@/types/financeiroSaldoConta'

interface TenentState {
  saldoConta: FinanceiroSaldoContaResponse[]
  setSaldoConta: (tenents: FinanceiroSaldoContaResponse[]) => void
}

const useSaldoContaStore = create<TenentState>((set) => ({
  saldoConta: [],
  setSaldoConta: (tenents: FinanceiroSaldoContaResponse[]) =>
    set(() => ({
      saldoConta: tenents,
    })),
}))


export default useSaldoContaStore
