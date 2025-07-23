'use client'

import { useEffect, useState } from 'react'

import {
  Typography,
  Card,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CardContent,
  CircularProgress,
  styled
} from '@mui/material'


import type { FinanceiroSaldoContaResponse } from '@/types/financeiroSaldoConta'
import formatarData from '@/utils/formatarData'
import formatarDinheiroReal from '@/utils/formatarDinheiroReal'
import { useFinanceiroSaldoConta } from '@/hooks/useFinanceiroSaldoConta'

// Estilizações
const StyledTable = styled(Table)(({ theme }) => ({
  '& .MuiTableCell-head': {
    backgroundColor: theme.palette.AppBar,
    color: theme.palette.common.white,
  },
  '& .MuiTableCell-body': {
    fontSize: 14,
  },
  '& .MuiTableCell-stickyHeader': {
    backgroundColor: theme.palette.AppBar,
    color: theme.palette.common.white,
  },
  '& .MuiTableRow-hover:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiTableRow-root': {
    cursor: 'pointer',
  },
  '& .MuiTableCell-root': {
    padding: '16px 24px',
  },
}))

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: 600,
  overflowY: 'auto',

  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.divider,
    borderRadius: '4px',
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-button': {
    display: 'none',
  },
}))

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  '& .MuiTableCell-head': {
    color: theme.palette.common.white,
  },
  '& .MuiTableCell-body': {
    fontSize: 14,
  },
  '& .MuiTableCell-stickyHeader': {
    color: theme.palette.common.white,
  },
}))

const TabelaSaldos = () => {
  const { saldoConta } = useFinanceiroSaldoConta()
  const [valorTotal, setValorTotal] = useState(0)

  useEffect(() => {
    if (saldoConta) {
      const total = saldoConta.reduce((acc, item) => acc + item.vlSaldo, 0)

      setValorTotal(total)
    }
  }, [saldoConta])

  if (!saldoConta) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <Card style={{ border: '1px solid var(--mui-palette-divider)' }}>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <i className="ri-bank-line" style={{ fontSize: 22, color: 'var(--mui-palette-text-primary)' }} />
            <Typography variant="h4">Detalhes das contas</Typography>
          </div>
          <Typography variant="body2">Informações detalhadas de todas as contas bancárias e caixas</Typography>
        </div>
        <Typography color={valorTotal > 0 ? 'success.main' : 'error.main'} variant="h4" fontWeight={600}>
          {formatarDinheiroReal(valorTotal)}
        </Typography>
      </div>

      <CardContent style={{ padding: 0 }}>
        <StyledTableContainer>
          <StyledTable stickyHeader>
            <StyledTableHead>
              <TableRow style={{ backgroundColor: 'var(--mui-palette-primary-main)' }}>
                <TableCell align="left"><Typography>Conta</Typography></TableCell>
                <TableCell align="right"><Typography>Última Conciliação</Typography></TableCell>
                <TableCell align="right"><Typography>Saldo</Typography></TableCell>
              </TableRow>
            </StyledTableHead>

            {saldoConta.length === 0 && (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <CircularProgress size={75} />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}

            <TableBody>
              {saldoConta.map((row: FinanceiroSaldoContaResponse, index: number) => (
                <TableRow hover key={index}>
                  <TableCell align="left">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <i className="ri-bank-line" style={{ fontSize: 18, color: 'var(--mui-palette-text-secondary)' }} />
                        <Typography variant="body2">{row.nBancoFormatado || 'Indisponível'}</Typography>
                        <Typography color="text.primary" fontWeight={500}> - {row.nomeConta}</Typography>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell align="right">
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 6 }}>
                      <i className="ri-calendar-line" style={{ fontSize: 22 }} />
                      <Typography color="text.primary">
                        {row.dataUltConciliacao ? formatarData(row.dataUltConciliacao) : 'Indisponível'}
                      </Typography>
                    </div>
                  </TableCell>

                  <TableCell align="right">
                    <Chip
                      className="capitalize"
                      variant="tonal"
                      color={
                        row.vlSaldo < 0 ? 'error' : row.vlSaldo === 0 ? 'secondary' : 'success'
                      }
                      label={formatarDinheiroReal(row.vlSaldo)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </StyledTableContainer>
      </CardContent>
    </Card>
  )
}

export default TabelaSaldos
