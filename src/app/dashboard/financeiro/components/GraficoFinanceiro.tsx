'use client'

import { useMediaQuery, useTheme } from '@mui/material';

import GraficoDesktop from './grafico/GraficoDesktop';
import GraficoMobile from './grafico/GraficoMobile';

const GraficoFinanceiro = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))


  return isMobile ? <GraficoMobile /> : <GraficoDesktop />
}

export default GraficoFinanceiro
