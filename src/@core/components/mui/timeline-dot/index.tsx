// ** MUI Imports
import { useTheme } from '@mui/material/styles'
import MuiTimelineDot from '@mui/lab/TimelineDot'

// ** Hooks Imports

// ** Util Import

// ** Types
import type { CustomTimelineDotProps, ColorsType } from './types'

const TimelineDot = (props: CustomTimelineDotProps) => {
  // ** Props
  const { sx, skin, color, variant } = props

  // ** Hook
  const theme = useTheme()

  const colors: ColorsType = {
    primary: {
      boxShadow: 'none',
      color: theme.palette.primary.main,
      backgroundColor: 'blue'
    },
    secondary: {
      boxShadow: 'none',
      color: theme.palette.secondary.main,
      backgroundColor: '#fff'
    },
    success: {
      boxShadow: 'none',
      color: theme.palette.success.main,
      backgroundColor: '#fff'
    },
    error: {
      boxShadow: 'none',
      color: theme.palette.error.main,
      backgroundColor: '#fff'
    },
    warning: {
      boxShadow: 'none',
      color: theme.palette.warning.main,
      backgroundColor: '#fff'
    },
    info: {
      boxShadow: 'none',
      color: theme.palette.info.main,
      backgroundColor: '#fff'
    },
    grey: {
      boxShadow: 'none',
      color: theme.palette.grey[500],
      backgroundColor: theme.palette.grey[500]
    }
  }

  return (
    <MuiTimelineDot
      {...props}
      sx={color && skin === 'light' && variant === 'filled' ? Object.assign(colors[color], sx) : sx}
    />
  )
}

TimelineDot.defaultProps = {
  color: 'grey',
  variant: 'filled'
}

export default TimelineDot
