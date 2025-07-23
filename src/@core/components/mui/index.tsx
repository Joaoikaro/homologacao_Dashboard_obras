// ** MUI Imports
import MuiBadge from '@mui/material/Badge'

// ** Types

import type { CustomBadgeProps } from './types'

// ** Hooks Imports

const Badge = (props: CustomBadgeProps) => {
  // ** Props
  const { sx } = props

  // ** Hook

  return <MuiBadge {...props} sx={sx} />
}

export default Badge
