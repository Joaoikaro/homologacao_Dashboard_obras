'use client'

import { useMediaQuery, useTheme } from '@mui/material';

import FiltrosStatusDesktop from './filtrosStatus/FiltrosStatusDesktop';
import FiltrosStatusMobile from './filtrosStatus/FiltrosStatusMobile';


const FiltrosStatus = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))


  return isMobile ? <FiltrosStatusMobile /> : <FiltrosStatusDesktop />
}

export default FiltrosStatus
