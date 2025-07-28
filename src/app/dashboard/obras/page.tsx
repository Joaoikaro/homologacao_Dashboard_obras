'use client'

import { Grid } from '@mui/material';

import FiltrosStatus from './components/dashboard/FiltrosStatus';
import CardsObras from './components/dashboard/CardsObras';

export default function Page() {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, md: 12, lg: 12 }} >
        <FiltrosStatus />
      </Grid>

      <Grid size={{ xs: 12, md: 12, lg: 12 }}>
        <CardsObras />
      </Grid >
    </Grid>
  );
}

