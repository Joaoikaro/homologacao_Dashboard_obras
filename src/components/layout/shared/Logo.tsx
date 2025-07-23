'use client'

import { useEffect, useRef } from 'react'

import Image from 'next/image'

import useVerticalNav from '@menu/hooks/useVerticalNav'
import { useSettings } from '@core/hooks/useSettings'

const Logo = () => {
  const logoTextRef = useRef<HTMLSpanElement>(null)
  const { isHovered, isBreakpointReached } = useVerticalNav()
  const { settings } = useSettings()

  const { layout, mode = 'light' } = settings || {}

  useEffect(() => {
    if (layout !== 'collapsed') return

    if (logoTextRef?.current) {
      if (!isBreakpointReached && !isHovered) {
        logoTextRef.current.classList.add('hidden')
      } else {
        logoTextRef.current.classList.remove('hidden')
      }
    }
  }, [isHovered, layout, isBreakpointReached])

  const getLogoSrc = () => {
    if (layout === 'collapsed' && !isHovered) return '/images/G-logo.png'

    return mode === 'dark' ? '/images/logo_branca.png' : '/images/logo.png'
  }

  const getLogoSize = () => {
    return layout === 'collapsed' && !isHovered
      ? { width: 40, height: 40, className: 'w-10 max-w-10' }
      : { width: 300, height: 40, className: 'w-9/12 h-auto' }
  }

  const { width, height, className } = getLogoSize()

  return (
    <div className='flex items-center min-bs-[24px]'>
      <Image
        src={getLogoSrc()}
        alt="Logo"
        width={width}
        height={height}
        priority
        className={className}
        onError={(e) => {
          e.currentTarget.src = '/images/logo.png'
        }}
      />
    </div>
  )
}

export default Logo
