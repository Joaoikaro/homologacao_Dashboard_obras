'use client'

import { useMediaQuery, useTheme } from '@mui/material';

import CardsObrasDesktop from './cardsObras/CardsObrasDesktop';
import CardsObrasMobile from './cardsObras/CardsObrasMobile';


const CardsObras = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))


  return isMobile ? <CardsObrasMobile /> : <CardsObrasDesktop />
}

export default CardsObras
