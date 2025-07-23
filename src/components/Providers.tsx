import type { ChildrenType, Direction } from '@core/types'

import { NextAuthProvider } from '@/contexts/nextAuthProvider'
import { VerticalNavProvider } from '@menu/contexts/verticalNavContext'
import { SettingsProvider } from '@core/contexts/settingsContext'
import ThemeProvider from '@components/theme'
import ReduxProvider from '@/redux-store/ReduxProvider'

import AppReactToastify from '@/lib/styles/AppReactToastify'
import { getMode, getSettingsFromCookie, getSystemMode } from '@core/utils/serverHelpers'
import { ReactQueryProvider } from '@/providers/ReactProvider'

type Props = ChildrenType & {
  direction: Direction
}

const Providers = async (props: Props) => {
  const { children, direction } = props

  const mode = await getMode()
  const settingsCookie = await getSettingsFromCookie()
  const systemMode = await getSystemMode()

  return (
    <NextAuthProvider basePath={process.env.NEXTAUTH_BASEPATH}>
      <VerticalNavProvider>
        <SettingsProvider settingsCookie={settingsCookie} mode={mode}>
          <ThemeProvider direction={direction} systemMode={systemMode}>
            <ReactQueryProvider>
              <ReduxProvider>{children}</ReduxProvider>
              <AppReactToastify direction={direction} hideProgressBar />
            </ReactQueryProvider>
          </ThemeProvider>
        </SettingsProvider>
      </VerticalNavProvider>
    </NextAuthProvider>
  )
}

export default Providers
