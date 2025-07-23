import { Box } from "@mui/material"
import { keyframes } from "@emotion/react"

import { useSettings } from "@/@core/hooks/useSettings"

interface BoxFilterTypes {
  selectedBgColor: string
  quantidade: string | number
  selected?: boolean
  onClick: () => void
  descBox: string
  total?: number
}

const float = keyframes`
  0% { transform: translateY(4px); }
  50% { transform: translateY(-4px); }
  100% { transform: translateY(4px); }
`

export const BoxFilter = ({
  selectedBgColor,
  quantidade,
  selected,
  onClick,
  descBox,
  total,
}: BoxFilterTypes) => {

  const { settings } = useSettings()

  const fontColor = settings.mode === 'light' && selected === false ? selectedBgColor : '#f4f4f4'

  return (
    <Box
      sx={{
        cursor: 'pointer',
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: '8px',
        borderRadius: '0.5rem',
        height: '100%',
        backgroundColor: selected ? selectedBgColor : 'transparent',
        transition: 'background-color 0.3s ease, border 0.3s ease',
        border: selected ? '2px solid #f4f4f4' : `2px solid ${selectedBgColor}`,
        boxShadow: selected ? '0 4px 12px rgba(0,0,0,0.2)' : 'none',
        animation: selected ? `${float} 1s ease-in-out infinite` : 'none',
      }}
      onClick={onClick}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%' }} >
        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: fontColor }}>
          {quantidade}
        </div>

        <div>
          <p style={{ fontSize: '1rem', fontWeight: '400', color: selected ? '#f4f4f4' : fontColor }}>{total}</p>
        </div>
      </div>
      <p style={{ fontSize: '1.4rem', fontWeight: 'bold', color: fontColor }}>{descBox}</p>
    </Box>
  )
}
