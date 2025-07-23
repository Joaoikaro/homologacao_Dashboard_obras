import { Button } from '@mui/material'

import { useSettings } from '@/@core/hooks/useSettings'

interface FilterButtonProps {
  idTarefa: number
  quantidade: number
  selected?: boolean
  onClick: () => void
  descTarefa: string
}

export const FilterButton = ({ idTarefa, quantidade, selected = false, onClick, descTarefa }: FilterButtonProps) => {
  const { settings } = useSettings()

  const fontColor =
    settings.mode === 'light' && selected
      ? '#f4f4f4'
      : settings.mode === 'light' && selected === false
        ? '#858585'
        : '#fff'

  const backgroundColor =
    settings.mode === 'light' && selected ? '#1c83d4' : settings.mode === 'dark' && selected ? '#1c83d4' : 'transparent'

  return (
    <Button
      style={{
        backgroundColor: backgroundColor,
        color: fontColor,
        borderRadius: '0.5rem',
        padding: '10px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        border: selected ? '1px solid #f4f4f4' : '1px solid #858585',
        textTransform: 'none',
        boxShadow: selected ? '0 4px 12px rgba(0,0,0,0.2)' : 'none',
        transition: 'background-color 0.3s ease, color 0.3s ease'
      }}
      fullWidth
      key={idTarefa}
      onClick={onClick}
    >
      <p className='text-lg font-semibold'>
        {descTarefa} <br /> ({quantidade})
      </p>
    </Button>
  )
}
