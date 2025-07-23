import { IconButton, styled } from '@mui/material'
import type { GridRenderCellParams, GridColDef } from '@mui/x-data-grid'

import EditIcon from '@mui/icons-material/Edit'

import TableStatusWrapper from '../components/TableStatusWrapper'
import BackupInstaladoWrapper from '../components/BackupInstaladoWrapper'
import type { ClientesGeral } from '@/types/clientes'

export const TableRowWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  padding: ' 8px 0'
})

export const getColumns = (handleEditClick: (row: ClientesGeral) => void): GridColDef<ClientesGeral>[] => [
  {
    field: 'IdCliente',
    headerName: 'Código',
    description: 'Código do cliente',
    disableColumnMenu: true,
    sortable: false,
    width: 70,
    renderCell: (params: GridRenderCellParams<ClientesGeral, any>) => (
      <TableRowWrapper>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <div>{params?.row?.IdCliente ?? 'Nome não disponível'}</div>
        </div>
      </TableRowWrapper>
    )
  },
  {
    field: 'Cliente',
    headerName: 'Cliente',
    description: 'Nome do cliente',
    flex: 1,
    renderCell: (params: GridRenderCellParams<ClientesGeral, any>) => (
      <TableRowWrapper>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <div>{params?.row?.Cliente ?? 'Nome não disponível'}</div>
        </div>
      </TableRowWrapper>
    )
  },
  {
    field: 'Email',
    headerName: 'Email',
    description: 'Email do cliente',
    flex: 1,
    renderCell: (params: GridRenderCellParams<ClientesGeral, any>) => (
      <TableRowWrapper>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <div>{params?.row?.Email ?? 'Nome não disponível'}</div>
        </div>
      </TableRowWrapper>
    )
  },
  {
    field: 'Senha',
    headerName: 'Senha',
    description: 'Senha do cliente',
    flex: 1,
    renderCell: (params: GridRenderCellParams<ClientesGeral, any>) => (
      <TableRowWrapper>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <div>{params?.row?.Senha ?? 'Nome não disponível'}</div>
        </div>
      </TableRowWrapper>
    )
  },
  {
    field: 'Modulo',
    headerName: 'Modulo',
    description: 'Modulo do cliente',
    flex: 1,
    renderCell: (params: GridRenderCellParams<ClientesGeral, any>) => (
      <TableRowWrapper>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <div>{params?.row?.Modulo ?? 'Nome não disponível'}</div>
        </div>
      </TableRowWrapper>
    )
  },
  {
    field: 'MaxBackupSN',
    headerName: 'Max Backup',
    disableColumnMenu: true,
    sortable: false,
    description: 'Max Backup instalado',
    width: 130,
    maxWidth: 130,
    minWidth: 130,
    disableReorder: true,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams<ClientesGeral, any>) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '8px 0'
        }}
      >
        <BackupInstaladoWrapper instalado={params?.row?.MaxBackupSN}>
          {params?.row?.MaxBackupSN === 1 ? 'Instalado' : 'Não Instalado'}
        </BackupInstaladoWrapper>
      </div>
    )
  },
  {
    field: 'StatusCliente',
    headerName: 'Status',
    disableColumnMenu: true,
    width: 100,
    maxWidth: 100,
    minWidth: 100,
    headerAlign: 'center',
    sortable: false,
    disableReorder: true,
    align: 'center',
    description: 'Status do sistema',
    renderCell: (params: GridRenderCellParams<ClientesGeral, any>) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '8px 0'
        }}
      >
        <TableStatusWrapper status={params?.row?.StatusCliente ?? 'indefinido'}>
          {params?.row?.StatusCliente ?? 'Nome não disponível'}
        </TableStatusWrapper>
      </div>
    )
  },
  {
    field: 'Id',
    headerName: 'Editar',
    headerAlign: 'center',
    align: 'center',
    disableColumnMenu: true,
    sortable: false,
    resizable: false,
    renderCell: (params: GridRenderCellParams<ClientesGeral, any>) => (
      <IconButton size='large' onClick={() => handleEditClick(params.row)}>
          <EditIcon fontSize={'inherit'} />
      </IconButton>
    )
  }
]
