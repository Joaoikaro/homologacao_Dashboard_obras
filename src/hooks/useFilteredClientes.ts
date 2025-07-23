import { useMemo } from 'react'

import { useClientesStore } from '../store/clientes'
import { useBoxFiltros } from '@/store/BoxFilters'

export const useFilteredClientes = () => {
  const { clientes, clientesFiltrados } = useClientesStore()
  const { filtroClienteAplicado } = useBoxFiltros()

  return useMemo(() => {
    return clientes.filter(cliente => {
      const matchBackupSN =
        filtroClienteAplicado.Id === 0 ||
        (filtroClienteAplicado.Id === 1 && cliente.MaxBackupSN === 1) ||
        (filtroClienteAplicado.Id === 2 && cliente.MaxBackupSN === 0)

      return matchBackupSN
    })
  }, [clientes, clientesFiltrados, filtroClienteAplicado])
}
