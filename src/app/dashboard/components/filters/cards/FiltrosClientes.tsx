'use client'

import { BoxFilter } from './BoxFilter'
import { useBoxFiltros } from '@/store/BoxFilters'
import { useTipoTarefaFiltros } from '@/store/backupTypeFilters'
import { useClientesStore } from '@/store/clientes'

const FiltrosClientes = () => {
  const { clientes } = useClientesStore()

  const { filtroTipoAplicado } = useTipoTarefaFiltros()
  const { filtroClienteAplicado, setFiltroClienteAplicado } = useBoxFiltros()

  // Filtra os clientes
  const clientesComBackup = () => {
    if (filtroTipoAplicado.Id !== 0) {
      return clientes.filter(cliente => cliente.MaxBackupSN === 1).length
    } else {
      return clientes.filter(cliente => cliente.MaxBackupSN === 1).length
    }
  }

  const clientesSemBackup = () => {
    if (filtroTipoAplicado.Id !== 0) {
      return clientes.filter(cliente => cliente.MaxBackupSN === 0).length
    } else {
      return clientes.filter(cliente => cliente.MaxBackupSN === 0).length
    }
  }

  // Funções para selecionar os filtros de atrasos
  const selectInstalados = async () => {
    if (filtroClienteAplicado.Id === 1) {
      await setFiltroClienteAplicado({ Id: 0, Nome: '' })
    } else {
      await setFiltroClienteAplicado({ Id: 1, Nome: 'Atrasados +1 dia' })
    }
  }

  const selectNaoInstalados = async () => {
    if (filtroClienteAplicado.Id === 2) {
      await setFiltroClienteAplicado({ Id: 0, Nome: '' })
    } else {
      await setFiltroClienteAplicado({ Id: 2, Nome: 'Atrasados hoje' })
    }
  }

  // const selectClientesInativos = async () => {
  //     if (filtroClienteAplicado.Id === 3) {
  //     await setFiltroClienteAplicado({ Id: 0, Nome: '' })
  //     } else {
  //     await setFiltroClienteAplicado({ Id: 3, Nome: 'Clientes Inativos' })
  //     }
  // }

  // const selectClientesAtivos = async () => {
  //     if (filtroClienteAplicado.Id === 4) {
  //         await setFiltroClienteAplicado({ Id: 0, Nome: '' })
  //     } else {
  //         await setFiltroClienteAplicado({ Id: 4, Nome: 'Clientes Ativos' })
  //     }
  // }

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
        onClick={selectInstalados}
        quantidade={clientesComBackup()}
        total={clientes.length}
        descBox={'Com backup'}
        selectedBgColor='#1c83d4'
        selected={filtroClienteAplicado.Id === 1}
      />

      <BoxFilter
        onClick={selectNaoInstalados}
        quantidade={clientesSemBackup()}
        total={clientes.length}
        descBox={'Sem backup'}
        selectedBgColor='#e57c00'
        selected={filtroClienteAplicado.Id === 2}
      />

      {/* <BoxFilter
        onClick={selectClientesInativos}
        quantidade={69}
        descBox={'Clientes Inativos'}
        selectedBgColor='#f14343'
        selected={filtroClienteAplicado.Id === 3}
      />
      <BoxFilter
        onClick={selectClientesAtivos}
        quantidade={69}
        descBox={'Clientes Ativos'}
        selectedBgColor='#4caf50'
        selected={filtroClienteAplicado.Id === 4}
      /> */}
    </div>
  )
}

export default FiltrosClientes
