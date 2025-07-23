import { useState } from 'react'

import type {
  DataGridProps,
  GridColDef,
  GridSortModel
} from '@mui/x-data-grid';
import {
  DataGrid,
  gridClasses,
} from '@mui/x-data-grid'
import { ptBR } from '@mui/x-data-grid/locales'
import {
  TextField,
  IconButton,
  useMediaQuery,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

interface TableMaxProps extends DataGridProps {
  columns: GridColDef[]
  rows: any[]
  isloading?: boolean
  getRowId?: (row: any) => any
  onRowClick?: (row: any) => void
  minHeight?: number
  maxHeight?: number
}

function TableMax({
  columns,
  rows,
  isloading = false,
  onRowClick,
  getRowId,
  minHeight,
  maxHeight,
}: TableMaxProps) {
  const [search, setSearch] = useState('')

  const [sortModel, setSortModel] = useState<GridSortModel>([])
  const isDesktop = useMediaQuery('(min-width:1040px)')

  const filteredRows = rows.filter((row) => {
    return Object.values(row).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  })

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: isDesktop ? 'row' : 'column',
          gap: 12,
          height: isDesktop ? 45 : 'auto',
          marginTop: 12,
          marginBottom: 12,
          alignItems: 'center',
        }}
      >
        <TextField
          fullWidth
          label={'Pesquisar'}
          placeholder={'Digite para pesquisar'}
          value={search}
          size="small"
          onChange={(event) => setSearch(event.target.value)}
          sx={{
            '& .MuiInputBase-root': { height: 45 },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: '1px solid #0064AC',
            },
          }}
          InputProps={{
            endAdornment: (
              <>
                {search && (
                  <IconButton onClick={() => setSearch('')}>
                    <CloseIcon />
                  </IconButton>
                )}
                <SearchIcon />
              </>
            ),
          }}
        />
      </div>

      <div
        style={{
          height: '69vh',
          width: '100%',
          minHeight,
          maxHeight,
        }}
      >
        <DataGrid
          rows={filteredRows}
          columns={columns}
          sortModel={sortModel}
          getRowId={getRowId}
          onSortModelChange={(model) => setSortModel(model)}
          pageSizeOptions={[10, 25, 50, 100]}
          disableRowSelectionOnClick
          onRowClick={onRowClick}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          loading={isloading}
          getRowHeight={() => 'auto'}
          sx={{
            [`& .${gridClasses.cell}`]: {
              py: 1,
              cursor: onRowClick ? 'pointer' : 'auto',
            },
            '& .MuiDataGrid-cell:focus': { outline: 0 },
            '& .MuiDataGrid-columnHeader:focus': { outline: 0 },
            '& .MuiDataGrid-cell:focus-within': { outline: 0 },
            '& .MuiDataGrid-columnHeader:focus-within': { outline: 0 },
            '--DataGrid-overlayHeight': '300px',
          }}
        />
      </div>
    </>
  )
}

export default TableMax
