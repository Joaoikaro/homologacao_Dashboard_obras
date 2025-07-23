/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useBackupClientes } from '@/store/backups'
import { FilterButton } from './FilterButton'
import { useTipoTarefaFiltros } from '@/store/backupTypeFilters'

import { useLoading } from '@/store/loading'

const FiltrosTipoTarefa = () => {
  const { backupClientes, setBackupsFiltrados, backupsFiltrados, backupsTotais } = useBackupClientes()
  const { filtroTipoAplicado, setFiltroTipoAplicado } = useTipoTarefaFiltros()
  const { setLoading } = useLoading()

  // Funções para selecionar o tipo de tarefa
  const selectTipoDataBase = async () => {
    if (filtroTipoAplicado.Id === 1) {
      await setFiltroTipoAplicado({ Id: 0, Nome: '' })
    } else {
      await setFiltroTipoAplicado({ Id: 1, Nome: 'Data Base' })
    }
  }

  const selectTipoFiscalXML = async () => {
    if (filtroTipoAplicado.Id === 2) {
      await setFiltroTipoAplicado({ Id: 0, Nome: '' })
    } else {
      await setFiltroTipoAplicado({ Id: 2, Nome: 'Fiscal XML' })
    }
  }

  const selectTipoDocAnexos = async () => {
    if (filtroTipoAplicado.Id === 3) {
      await setFiltroTipoAplicado({ Id: 0, Nome: '' })
    } else {
      await setFiltroTipoAplicado({ Id: 3, Nome: 'Doc Anexos' })
    }
  }

  const selectTipoCompletoMensal = async () => {
    if (filtroTipoAplicado.Id === 4) {
      await setFiltroTipoAplicado({ Id: 0, Nome: '' })
    } else {
      await setFiltroTipoAplicado({ Id: 4, Nome: 'Completo Mensal' })
    }
  }

  const selectTipoAtualizacoesSistema = async () => {
    if (filtroTipoAplicado.Id === 5) {
      await setFiltroTipoAplicado({ Id: 0, Nome: '' })
    } else {
      await setFiltroTipoAplicado({ Id: 5, Nome: 'Atualizações do Sistema' })
    }
  }

  const selectTipoOutros = async () => {
    if (filtroTipoAplicado.Id === 6) {
      await setFiltroTipoAplicado({ Id: 0, Nome: '' })
    } else {
      await setFiltroTipoAplicado({ Id: 6, Nome: 'Outros' })
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
      <FilterButton
        descTarefa='Data Base'
        idTarefa={1}
        quantidade={backupsTotais.find(backup => backup.Id_TipoTarefa === 1)?.TotalRegistros || 0}
        selected={filtroTipoAplicado.Id === 1}
        onClick={selectTipoDataBase}
      />

      <FilterButton
        descTarefa='Fiscal XML'
        idTarefa={2}
        quantidade={backupsTotais.find(backup => backup.Id_TipoTarefa === 2)?.TotalRegistros || 0}
        selected={filtroTipoAplicado.Id === 2}
        onClick={selectTipoFiscalXML}
      />

      <FilterButton
        descTarefa='Doc Anexos'
        idTarefa={3}
        quantidade={backupsTotais.find(backup => backup.Id_TipoTarefa === 3)?.TotalRegistros || 0}
        selected={filtroTipoAplicado.Id === 3}
        onClick={selectTipoDocAnexos}
      />

      <FilterButton
        descTarefa='Completo Mensal'
        idTarefa={4}
        quantidade={backupsTotais.find(backup => backup.Id_TipoTarefa === 4)?.TotalRegistros || 0}
        selected={filtroTipoAplicado.Id === 4}
        onClick={selectTipoCompletoMensal}
      />

      <FilterButton
        descTarefa='Att. Sistema'
        idTarefa={5}
        quantidade={backupsTotais.find(backup => backup.Id_TipoTarefa === 5)?.TotalRegistros || 0}
        selected={filtroTipoAplicado.Id === 5}
        onClick={selectTipoAtualizacoesSistema}
      />

      <FilterButton
        descTarefa='Outros'
        idTarefa={6}
        quantidade={backupsTotais.find(backup => backup.Id_TipoTarefa === 6)?.TotalRegistros || 0}
        selected={filtroTipoAplicado.Id === 6}
        onClick={selectTipoOutros}
      />
    </div>
  )
}

export default FiltrosTipoTarefa
