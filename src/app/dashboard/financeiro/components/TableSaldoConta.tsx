'use client'

import { useMediaQuery, useTheme } from '@mui/material'

import TabelaSaldos from './tabela/TabelaSaldos'
import TabelaSaldosMobile from './tabela/TabelaSaldosMobile'

const TableSaldoContas = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return isMobile ? <TabelaSaldosMobile /> : <TabelaSaldos />
}

export default TableSaldoContas
