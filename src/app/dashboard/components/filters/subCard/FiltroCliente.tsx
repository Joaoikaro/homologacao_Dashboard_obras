/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useEffect } from 'react'

import { useBackupClientes } from '@/store/backups'
import { FilterButton } from './FilterButton'
import { useTipoTarefaFiltros } from '@/store/backupTypeFilters'

import calcularDiasEntreDatas from '../../../../../utils/calcularDiasEntreDatas'
import { useLoading } from '@/store/loading'

const FiltrosStatus = () => {
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
        descTarefa='Ativos'
        idTarefa={1}
        quantidade={backupsTotais.find(backup => backup.Id_TipoTarefa === 1)?.TotalRegistros || 0}
        selected={filtroTipoAplicado.Id === 1}
        onClick={selectTipoDataBase}
      />

      <FilterButton
        descTarefa='Inativos'
        idTarefa={2}
        quantidade={backupsTotais.find(backup => backup.Id_TipoTarefa === 2)?.TotalRegistros || 0}
        selected={filtroTipoAplicado.Id === 2}
        onClick={selectTipoFiscalXML}
      />

      <FilterButton
        descTarefa='Todos'
        idTarefa={3}
        quantidade={backupsTotais.find(backup => backup.Id_TipoTarefa === 3)?.TotalRegistros || 0}
        selected={filtroTipoAplicado.Id === 3}
        onClick={selectTipoDocAnexos}
      />
    </div>
  )
}

export default FiltrosStatus
