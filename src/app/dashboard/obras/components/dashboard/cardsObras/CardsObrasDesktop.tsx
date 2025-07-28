import { Card, Divider, Typography } from "@mui/material"

const CardsObrasDesktop = () => {

  return (
    <>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: '8px',
          border: '1px solid var(--mui-palette-divider)'
        }}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '8px' }}>
          <Typography
            className="ri-building-line"
            fontSize={40}
            color="var(--mui-palette-primary-main)"
          />
          <div className="flex flex-col">
            <Typography variant="h5">Edificio Sede GerenteMax</Typography>
            <Typography variant="body2">GerenteMax Softwares</Typography>
          </div>
        </div>

        <Divider />

        <div style={{ display: 'flex', flexDirection: 'row', gap: 8, margin: '8px' }}>
          <div>Cronograma de execução</div>
          <div>Cronograma Financeiro</div>
          <div>Desempenho Executado X Custo</div>
        </div>
      </Card>
    </>
  )
}

export default CardsObrasDesktop
