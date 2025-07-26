import { create } from 'zustand'

import type { ObraCronogramalistar } from '@/types/obra'



interface ObrasState {
  obraCronogramaListar: ObraCronogramalistar[]
  setObraCronogramaListar: (obrasCronogramalistar: ObraCronogramalistar[]) => void
}

const useFinanceiroListarAgrupamentoStore = create<ObrasState>((set) => ({
  obraCronogramaListar: [],
  setObraCronogramaListar: (obrasCronogramaListar: ObraCronogramalistar[]) =>
    set(() => ({
      obraCronogramaListar: obrasCronogramaListar,
    }))

}))


export default useFinanceiroListarAgrupamentoStore
