import { useState } from "react"

import { Card, styled, Typography } from "@mui/material"

interface FilterCard {
  id: number
  descricao: string
  icon: string
}

const cards: FilterCard[] = [
  { id: 1, descricao: 'Em andamento', icon: 'ri-play-circle-line' },
  { id: 2, descricao: 'Não iniciadas', icon: 'ri-pause-circle-line' },
  { id: 3, descricao: 'Encerradas', icon: 'ri-checkbox-circle-line' },
  { id: 4, descricao: 'Todas', icon: 'ri-list-check-3' },
]


const CustomCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'selecionado',
})<{ selecionado: boolean }>(({ selecionado }) => ({
  border: '1px solid var(--mui-palette-customColors-inputBorder)',
  borderRadius: 'var(--mui-shape-borderRadius)',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '8px 16px',
  background: selecionado ? 'linear-gradient(to right, var(--mui-palette-primary-main) 0%, rgb(143, 200, 245) 110%)' : '',

  '&:hover': {
    transition: 'all 0.3s ease-in-out',
    boxShadow: '0px 4px 4px rgba(53, 53, 53, 0.25)',
    background: selecionado ? '' : 'var(--mui-palette-info-lighterOpacity)'
  }
}))

const FiltrosStatusDesktop = () => {
  const [cardSelecionado, setCardSelecionado] = useState<number>(1)

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 8, justifyContent: 'space-between' }}>
          {cards.map((card) => (
            <CustomCard
              key={card.id}
              selecionado={cardSelecionado === card.id}
              onClick={() => {
                console.log(`Card ${card.descricao} clicado!`)
                setCardSelecionado(card.id)
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: cardSelecionado === card.id ? 'var(--mui-palette-customColors-inputBorder)' : 'transparent', padding: 8, borderRadius: '50%' }}>
                  <Typography
                    className={card.icon}
                    fontSize={25}
                    color={cardSelecionado === card.id ? 'var(--mui-palette-warning-contrastText)' : 'var(--mui-palette-text-secondary)'}
                  />
                </div>
                <Typography variant="h5" color={cardSelecionado === card.id ? 'var(--mui-palette-warning-contrastText)' : 'var(--mui-palette-text-secondary)'}>{card.descricao}</Typography>
              </div>
            </CustomCard>
          ))}
        </div>
      </div>
    </>
  )
}

export default FiltrosStatusDesktop
