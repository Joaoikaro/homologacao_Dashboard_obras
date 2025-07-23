import { useState } from "react"

import { useSettings } from "./useSettings"

type Direction = 'ltr' | 'rtl'
type Mode = 'light' | 'dark' | 'system'


interface Settings {
  theme?: string
  layout?: string
  mode?: Mode
  skin?: string
  direction?: Direction
  primaryColor?: string
  semiDark?: boolean
}

const useThemeChange = () => {
  const [direction, setDirection] = useState<Direction>('ltr')
  const { updateSettings } = useSettings()

  const handleThemeChange = (
    field: keyof Settings,
    value: Settings[keyof Settings]
  ) => {
    if (field === 'direction') {
      setDirection(value as Direction)
    }

    updateSettings({ [field]: value })
  }


  return { direction, handleThemeChange }
}

export default useThemeChange
