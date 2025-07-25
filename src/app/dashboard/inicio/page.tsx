'use client'


import classNames from 'classnames'

import { useSettings } from '@core/hooks/useSettings'
import { useImageVariant } from '@/@core/hooks/useImageVariant'
import type { Mode } from '@/@core/types'

export default function Page() {
  const { settings } = useSettings()
  const mode: Mode = settings.mode!

  const darkIllustration = '/images/gerentemax/G-logo.png'
  const lightIllustration = '/images/gerentemax/G-logo.png'
  const borderedLightIllustration = '/images/gerentemax/G-logo.png'

  const loginImage = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedLightIllustration
  )


  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classNames('flex bs-full items-center justify-center flex-1 relative p-6', {
          'border-ie': settings.skin === 'bordered'
        })}
      >
        <div className='plb-12'>
          <img draggable={false} src={loginImage} className='max-bs-[500px] max-is-full bs-auto' />
        </div>
      </div>
    </div>
  )
}
