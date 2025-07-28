'use client'

import { useMediaQuery, useTheme } from '@mui/material';

import FiltrosStatusDesktop from './filtrosStatus/FiltrosStatusDesktop';


const FiltrosStatus = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))


  return isMobile ? null : <FiltrosStatusDesktop />
}

export default FiltrosStatus
