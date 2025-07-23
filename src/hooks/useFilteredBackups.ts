import { useMemo } from 'react'

import { useBackupClientes } from '@/store/backups'
import { useBoxFiltros } from '@/store/BoxFilters'
import { useTipoTarefaFiltros } from '@/store/backupTypeFilters'

export const useFilteredBackups = () => {
  const { backupClientes } = useBackupClientes()
  const { filtroBoxAplicado } = useBoxFiltros()
  const { filtroTipoAplicado } = useTipoTarefaFiltros()

  return useMemo(() => {
    return backupClientes.filter(b => {
      /* --- filtro por tipo de tarefa ------------------------ */
      const matchTipo = filtroTipoAplicado.Id === 0 || b.Id_TipoTarefa === filtroTipoAplicado.Id

      /* --- filtro por atraso -------------------------------- */
      const matchAtraso = (() => {
        switch (filtroBoxAplicado.Id) {
          case 1:
            return b.Dias > 1 // +1 dia
          case 2:
            return b.Dias === 1 // hoje
          case 3:
            return b.Dias >= 1 // total atrasados
          case 4:
            return b.Dias > 0 // clientes atrasados
          case 5:
            return b.Dias <= 0 // em dia
          default:
            return true // sem filtro
        }
      })()

      return matchTipo && matchAtraso
    })
  }, [backupClientes, filtroBoxAplicado, filtroTipoAplicado])
}
