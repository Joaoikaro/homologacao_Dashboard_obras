// ** MUI Imports
import MuiChip from '@mui/material/Chip'

// ** Third Party Imports
import clsx from 'clsx'

// ** Types
import type { CustomChipProps } from './types'

// ** Hooks Imports

const CustomChip = (props: CustomChipProps) => {
  // ** Props
  const { sx, skin, rounded } = props

  // ** Hook

  const propsToPass = { ...props }

  propsToPass.rounded = undefined

  return (
    <MuiChip
      {...propsToPass}
      variant='filled'
      className={clsx({
        'MuiChip-rounded': rounded,
        'MuiChip-light': skin === 'light'
      })}
      sx={sx}
    />
  )
}

export default CustomChip
