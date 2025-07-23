import { create } from 'zustand'

import type { FiltersData } from '@/types/filtros'


interface FiltrosTipoState {
  filtroTipoAplicado: FiltersData
  setFiltroTipoAplicado: (filtroTipoAplicado: FiltersData) => void
}

export const useTipoTarefaFiltros = create<FiltrosTipoState>((set) => ({
  filtroTipoAplicado: { Id: 0, Nome: '' },
  setFiltroTipoAplicado: (filtroTipoAplicado) => set({ filtroTipoAplicado }),
}))
