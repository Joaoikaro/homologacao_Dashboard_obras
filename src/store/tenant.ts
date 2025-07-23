import { create } from 'zustand'

import type { TenentResponse } from '@/types/auth'

interface TenentState {
  tenets: TenentResponse[]
  setTenent: (tenents: TenentResponse[]) => void
}

const useTenants = create<TenentState>((set) => ({
  tenets: [],
  setTenent: (tenents: TenentResponse[]) =>
    set(() => ({
      tenets: tenents,
    })),
}))

export default useTenants
