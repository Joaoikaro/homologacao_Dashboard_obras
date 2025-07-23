import { IconButton, styled } from '@mui/material'
import type { GridRenderCellParams, GridColDef } from '@mui/x-data-grid'
import { GridDeleteIcon } from '@mui/x-data-grid'

import type { BackupClientesGeral } from '@/types/backups'
import dateHourFormater from '@/utils/dateHourFormater'
import { DiasAtraso } from '../components/DiasAtraso'

export const TableRowWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  padding: ' 8px 0'
})

export const getColumns = (
  handleDeleteClick: (row: BackupClientesGeral) => void
): GridColDef<BackupClientesGeral>[] => [
  {
    field: 'IdCliente',
    headerName: 'Código',
    description: 'Código do cliente',
    disableColumnMenu: true,
    sortable: false,
    width: 70,
    renderCell: (params: GridRenderCellParams<BackupClientesGeral, any>) => (
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
    field: 'NomeCliente',
    headerName: 'Cliente',
    description: 'Nome do cliente',
    flex: 1,
    renderCell: (params: GridRenderCellParams<BackupClientesGeral, any>) => (
      <TableRowWrapper>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <div>{params?.row?.NomeCliente ?? 'Nome não disponível'}</div>
        </div>
      </TableRowWrapper>
    )
  },
  {
    field: 'NomeTarefa',
    headerName: 'Tarefa',
    description: 'Nome da tarefa',
    flex: 1,
    renderCell: (params: GridRenderCellParams<BackupClientesGeral, any>) => (
      <TableRowWrapper>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <div>{params?.row?.NomeTarefa ?? 'Nome não disponível'}</div>
        </div>
      </TableRowWrapper>
    )
  },

  {
    field: 'BackupResponsavel',
    headerName: 'Responsavel',
    description: 'Responsavel pelo backup',
    width: 150,
    renderCell: (params: GridRenderCellParams<BackupClientesGeral, any>) => (
      <TableRowWrapper>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <div>{params?.row?.BackupResponsavel}</div>
        </div>
      </TableRowWrapper>
    )
  },

  {
    field: 'DescricaoAgendamento',
    sortable: false,
    headerName: 'Agendamento',
    description: 'Tipo de agendamento',
    resizable: false,
    width: 150,
    renderCell: (params: GridRenderCellParams<BackupClientesGeral, any>) => (
      <TableRowWrapper>
        <div>{params?.row?.DescricaoAgendamento ?? 'indisponível'}</div>
      </TableRowWrapper>
    )
  },
  {
    field: 'DataUltAtualizacao',
    headerName: 'Data/Hora Backup',
    description: 'Data e hora do backup',
    resizable: false,
    width: 200,
    renderCell: (params: GridRenderCellParams<BackupClientesGeral, any>) => (
      <TableRowWrapper>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <div>{dateHourFormater(params?.row?.DataUltAtualizacao) ?? 'Nome não disponível'}</div>
        </div>
      </TableRowWrapper>
    )
  },
  {
    field: 'Dias',
    headerName: 'Dias de atraso',
    description: 'Dias Atrasado',
    headerAlign: 'center',
    align: 'center',
    disableColumnMenu: true,
    width: 150,
    resizable: false,
    renderCell: (params: GridRenderCellParams<BackupClientesGeral, any>) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <DiasAtraso diasAtraso={params.row.Dias || 0} />
      </div>
    )
  },
  {
    field: 'Id',
    headerName: 'Desativar',
    headerAlign: 'center',
    disableColumnMenu: true,
    align: 'center',
    sortable: false,
    resizable: false,
    renderCell: (params: GridRenderCellParams<BackupClientesGeral, any>) => (
      <IconButton size='large' onClick={() => handleDeleteClick(params.row)}>
          <GridDeleteIcon fontSize={'inherit'} />
      </IconButton>
    )
  }
]
