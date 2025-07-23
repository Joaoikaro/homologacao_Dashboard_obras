import Grid from '@mui/material/Grid2'

import TableSaldoContas from './components/TableSaldoConta'
import GraficoFinanceiro from './components/GraficoFinanceiro'
import { generateStaticLangParams } from '@/@core/utils/i18n-static'

const DashboardFinanceiro = () => {

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, md: 12, lg: 12 }}>
        <TableSaldoContas />
      </Grid>
      <Grid size={{ xs: 12, md: 12, lg: 12 }}>
        <GraficoFinanceiro/>
      </Grid>
    </Grid>
  )
}

export async function generateStaticParams() {
  return generateStaticLangParams()
}

export default DashboardFinanceiro
