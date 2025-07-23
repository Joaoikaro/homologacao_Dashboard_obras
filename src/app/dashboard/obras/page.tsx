'use client'

import { Grid } from '@mui/material'

import { ReactQueryProvider } from '@/providers/ReactProvider';

export default function Page() {
  return (
    <ReactQueryProvider>

      <Grid container spacing={6}>
        Dashboard Obras
      </Grid>
    </ReactQueryProvider>
  );
}

