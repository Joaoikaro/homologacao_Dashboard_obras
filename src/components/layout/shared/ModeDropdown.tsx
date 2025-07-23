'use client'

// React Imports
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'

import { useSettings } from '@core/hooks/useSettings'

const ModeToggle = () => {
  const { settings, updateSettings } = useSettings()

  const handleToggleMode = () => {
    const newMode = settings.mode === 'dark' ? 'light' : 'dark'

    updateSettings({ mode: newMode })
  }

  const getModeIcon = () => {
    if (settings.mode === 'dark') {
      return 'ri-moon-clear-line'
    } else {
      return 'ri-sun-line'
    }
  }

  const getTooltipText = () => {
    return settings.mode === 'dark' ? 'Modo escuro' : 'Modo claro'
  }

  return (
    <Tooltip title={getTooltipText()} arrow>
      <IconButton onClick={handleToggleMode} className='!text-textPrimary'>
        <i className={getModeIcon()} />
      </IconButton>
    </Tooltip>
  )
}

export default ModeToggle
