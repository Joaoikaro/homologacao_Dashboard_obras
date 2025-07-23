import { create } from 'zustand'

import type { FiltersData } from '@/types/filtros'


interface FiltrosAtrasosState {
  filtroBoxAplicado: FiltersData
  setFiltroBoxAplicado: (filtroBoxAplicado: FiltersData) => void
  filtroClienteAplicado: FiltersData
  setFiltroClienteAplicado: (filtroClienteAplicado: FiltersData) => void
}

export const useBoxFiltros = create<FiltrosAtrasosState>((set) => ({
  filtroBoxAplicado: { Id: 0, Nome: '' },
  setFiltroBoxAplicado: (filtroBoxAplicado) => set({ filtroBoxAplicado }),
  filtroClienteAplicado: { Id: 0, Nome: '' },
  setFiltroClienteAplicado: (filtroClienteAplicado) => set({ filtroClienteAplicado }),
}))
