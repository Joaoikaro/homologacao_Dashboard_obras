import { Card, Typography } from "@mui/material"

import { useObras } from "@/hooks/UseObras"

const CardsObrasDesktop = () => {
  const { obraListar } = useObras()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {obraListar?.map((obra) => (
        <Card
          key={obra.id}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: '8px',
            border: '1px solid var(--mui-palette-divider)',
          }}
        >
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '8px' }}>
            <Typography
              className="ri-building-line"
              fontSize={40}
              color="var(--mui-palette-primary-main)"
            />
            <div className="flex flex-col">
              <Typography variant="h5">{obra.descricao}</Typography>
              <Typography variant="body2">{obra.status}</Typography>
            </div>
          </div>

          {/* <Divider /> */}

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid var(--mui-palette-divider)',
                padding: '8px'
              }}
            >
              Cronograma de execução
            </div>

            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid var(--mui-palette-divider)',
                padding: '8px',
              }}
            >
              Cronograma Financeiro
            </div>

            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid var(--mui-palette-divider)',
                padding: '8px',
              }}>
              Desempenho Executado X Custo</div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default CardsObrasDesktop
