'use client'

// React Imports
import { useEffect, useRef, useState } from 'react'

// Hook Imports
import { useMediaQuery, useTheme } from '@mui/material'

import useVerticalNav from '@menu/hooks/useVerticalNav'
import { useSettings } from '@core/hooks/useSettings'

const Logo = () => {
  // Refs
  const logoTextRef = useRef<HTMLSpanElement>(null)

  // Hooks
  const { isHovered, isBreakpointReached } = useVerticalNav()
  const { settings } = useSettings()
  const { layout, mode } = settings

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

  const [logoSrc, setLogoSrc] = useState('/images/gerentemax/G-logo.png')

  const getTargetLogo = () => {
    if (isMobile && mode === 'light') {
      return '/images/gerentemax/Logo.png'
    } else if (isMobile && mode !== 'light') {
      return '/images/gerentemax/logo_branca.png'
    } else if (!isHovered && layout === 'collapsed') {
      return '/images/gerentemax/G-logo.png'
    } else if (mode === 'light') {
      return '/images/gerentemax/Logo.png'
    } else {
      return '/images/gerentemax/logo_branca.png'
    }
  }

  useEffect(() => {
    const targetSrc = getTargetLogo()

    if (targetSrc !== logoSrc) {
      const isGoingToGLogo = targetSrc.includes('G-logo')

      if (isGoingToGLogo) {
        const timeout = setTimeout(() => {
          setLogoSrc(targetSrc)
        }, 261)


        return () => clearTimeout(timeout)
      } else {
        setLogoSrc(targetSrc)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered, layout, mode, isMobile])

  useEffect(() => {
    if (layout !== 'collapsed') return

    if (logoTextRef?.current) {
      if (!isBreakpointReached && !isHovered) {
        logoTextRef.current?.classList.add('hidden')
      } else {
        logoTextRef.current.classList.remove('hidden')
      }
    }
  }, [isHovered, layout, isBreakpointReached])

  return (
    <div className='flex items-center min-bs-[24px]'>
      <img
        className='w-full'
        src={logoSrc}
        alt="GerenteMax"
      />
    </div>
  )
}

export default Logo
