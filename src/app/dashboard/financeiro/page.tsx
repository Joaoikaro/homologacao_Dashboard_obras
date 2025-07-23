import { Grid } from '@mui/material'

import TableSaldoContas from './components/TableSaldoConta'
import GraficoFinanceiro from './components/GraficoFinanceiro'

const DashboardFinanceiro = () => {

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, md: 12, lg: 12 }}>
        <TableSaldoContas />
      </Grid>
      <Grid size={{ xs: 12, md: 12, lg: 12 }}>
        <GraficoFinanceiro />
      </Grid>
    </Grid>
  )
}

export default DashboardFinanceiro
