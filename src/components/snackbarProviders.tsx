'use client'

import { SnackbarProvider } from 'notistack'

type Props = {
  children: React.ReactNode
}

const SnackbarProviders = ({ children }: Props) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={5000}
    >
      {children}
    </SnackbarProvider>
  )
}

export default SnackbarProviders
