'use client'

import { useBackupClientes } from '@/store/backups'
import { BoxFilter } from './BoxFilter'
import { useBoxFiltros } from '@/store/BoxFilters'
import { useTipoTarefaFiltros } from '@/store/backupTypeFilters'

const FiltrosAtrasos = () => {
  const { backupsTotais } = useBackupClientes()

  const { filtroTipoAplicado } = useTipoTarefaFiltros()
  const { filtroBoxAplicado, setFiltroBoxAplicado } = useBoxFiltros()

  // Filtra os backups atrasados
  const atrasados1dia = () => {
    if (filtroTipoAplicado.Id !== 0) {
      const tipoFiltrado = backupsTotais.find(backup => backup.Id_TipoTarefa === filtroTipoAplicado.Id)

      return tipoFiltrado?.AtrasadoMais1Dia || 0
    } else {
      const tipoFiltrado = backupsTotais.find(backup => backup.Id_TipoTarefa === 0)

      return tipoFiltrado?.AtrasadoMais1Dia || 0
    }
  }

  const atrasadosHoje = () => {
    if (filtroTipoAplicado.Id !== 0) {
      const tipoFiltrado = backupsTotais.find(backup => backup.Id_TipoTarefa === filtroTipoAplicado.Id)

      return tipoFiltrado?.AtrasadosHoje || 0
    } else {
      const tipoFiltrado = backupsTotais.find(backup => backup.Id_TipoTarefa === 0)

      return tipoFiltrado?.AtrasadosHoje || 0
    }
  }

  const TotalAtrasados = () => {
    if (filtroTipoAplicado.Id !== 0) {
      const tipoFiltrado = backupsTotais.find(backup => backup.Id_TipoTarefa === filtroTipoAplicado.Id)

      return tipoFiltrado?.TotalAtrasados || 0
    } else {
      const tipoFiltrado = backupsTotais.find(backup => backup.Id_TipoTarefa === 0)

      return tipoFiltrado?.TotalAtrasados || 0
    }
  }

  const ClientesAtrasados = () => {
    if (filtroTipoAplicado.Id !== 0) {
      const tipoFiltrado = backupsTotais.find(backup => backup.Id_TipoTarefa === filtroTipoAplicado.Id)

      return tipoFiltrado?.ClientesAtrasados || 0
    } else {
      const tipoFiltrado = backupsTotais.find(backup => backup.Id_TipoTarefa === 0)

      return tipoFiltrado?.ClientesAtrasados || 0
    }
  }

  const BackupsEmDia = () => {
    if (filtroTipoAplicado.Id !== 0) {
      const tipoFiltrado = backupsTotais.find(backup => backup.Id_TipoTarefa === filtroTipoAplicado.Id)

      return tipoFiltrado?.BackupEmDia || 0
    } else {
      const tipoFiltrado = backupsTotais.find(backup => backup.Id_TipoTarefa === 0)

      return tipoFiltrado?.BackupEmDia || 0
    }
  }

  // Funções para selecionar os filtros de atrasos
  const selectAtrasados1Dia = async () => {
    if (filtroBoxAplicado.Id === 1) {
      await setFiltroBoxAplicado({ Id: 0, Nome: '' })
    } else {
      await setFiltroBoxAplicado({ Id: 1, Nome: 'Atrasados +1 dia' })
    }
  }

  const selectAtrasadosHoje = async () => {
    if (filtroBoxAplicado.Id === 2) {
      await setFiltroBoxAplicado({ Id: 0, Nome: '' })
    } else {
      await setFiltroBoxAplicado({ Id: 2, Nome: 'Atrasados hoje' })
    }
  }

  const selectTotalAtrasados = async () => {
    if (filtroBoxAplicado.Id === 3) {
      await setFiltroBoxAplicado({ Id: 0, Nome: '' })
    } else {
      await setFiltroBoxAplicado({ Id: 3, Nome: 'Total atrasados' })
    }
  }

  const selectClientesAtrasados = async () => {
    if (filtroBoxAplicado.Id === 4) {
      await setFiltroBoxAplicado({ Id: 0, Nome: '' })
    } else {
      await setFiltroBoxAplicado({ Id: 4, Nome: 'Clientes Atrasados' })
    }
  }

  const selectBackupsEmDia = async () => {
    if (filtroBoxAplicado.Id === 5) {
      await setFiltroBoxAplicado({ Id: 0, Nome: '' })
    } else {
      await setFiltroBoxAplicado({ Id: 5, Nome: 'Backups em dia' })
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '1rem',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <BoxFilter
        onClick={selectAtrasados1Dia}
        quantidade={atrasados1dia()}
        descBox={'Atrasados +1 dia'}
        selectedBgColor='#f14343'
        selected={filtroBoxAplicado.Id === 1}
      />

      <BoxFilter
        onClick={selectAtrasadosHoje}
        quantidade={atrasadosHoje()}
        descBox={'Atrasados hoje'}
        selectedBgColor='#e57c00'
        selected={filtroBoxAplicado.Id === 2}
      />

      <BoxFilter
        selectedBgColor='#e1788a'
        onClick={selectTotalAtrasados}
        quantidade={TotalAtrasados()}
        descBox={'Total atrasados'}
        selected={filtroBoxAplicado.Id === 3}
      />

      <BoxFilter
        selectedBgColor='#3f51b5'
        onClick={selectClientesAtrasados}
        quantidade={ClientesAtrasados()}
        descBox={'Clientes Atrasados'}
        selected={filtroBoxAplicado.Id === 4}
        total={backupsTotais.find(backup => backup.Id_TipoTarefa === 0)?.TotalClientes}
      />

      <BoxFilter
        selectedBgColor='#4caf50'
        onClick={selectBackupsEmDia}
        quantidade={BackupsEmDia()}
        descBox={'Backups em dia'}
        selected={filtroBoxAplicado.Id === 5}
        total={backupsTotais.find(backup => backup.Id_TipoTarefa === 0)?.TotalRegistros}
      />
    </div>
  )
}

export default FiltrosAtrasos
