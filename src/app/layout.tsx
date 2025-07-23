import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'

import 'react-perfect-scrollbar/dist/css/styles.css'

import type { ChildrenType } from '@core/types'

import { getSystemMode } from '@core/utils/serverHelpers'

import '@/app/globals.css'

import '@assets/iconify-icons/generated-icons.css'

export const metadata = {
  title: 'MaxBackup',
  description:
    'MaxBackup'
}

const RootLayout = async (props: ChildrenType) => {
  const { children } = props

  const systemMode = await getSystemMode()
  const direction = 'ltr'

  return (
    <html id='__next' lang='pt-br' dir={direction} suppressHydrationWarning>
      <body className='flex is-full min-bs-full flex-auto flex-col'>
        <InitColorSchemeScript attribute='data' defaultMode={systemMode} />
        {children}
      </body>
    </html> 
  )
}

export default RootLayout
