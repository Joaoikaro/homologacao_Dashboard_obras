'use client'

// Next Imports
import { redirect, usePathname } from 'next/navigation'

// Config Imports

const LangRedirect = () => {
  const pathname = usePathname()

  const redirectUrl = `/${pathname}`

  redirect(redirectUrl)
}

export default LangRedirect
