import type { ChildrenType, Direction } from '@core/types'

import { VerticalNavProvider } from '@menu/contexts/verticalNavContext'
import { SettingsProvider } from '@core/contexts/settingsContext'
import ThemeProvider from '@components/theme'

import { getMode, getSettingsFromCookie, getSystemMode } from '@core/utils/serverHelpers'
import SnackbarProviders from './snackbarProviders'

type Props = ChildrenType & {
  direction: Direction
}

const Providers = async (props: Props) => {
  const { children, direction } = props

  const mode = await getMode()
  const settingsCookie = await getSettingsFromCookie()
  const systemMode = await getSystemMode()

  return (
    <VerticalNavProvider>
      <SettingsProvider settingsCookie={settingsCookie} mode={mode}>
        <ThemeProvider direction={direction} systemMode={systemMode}>
          <SnackbarProviders>
            {children}
          </SnackbarProviders>
        </ThemeProvider>
      </SettingsProvider>
    </VerticalNavProvider>
  )
}

export default Providers
