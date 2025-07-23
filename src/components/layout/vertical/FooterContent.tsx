'use client'

// Next Imports

// Third-party Imports
import classnames from 'classnames'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

const FooterContent = () => {
  // Hooks

  return (
    <div
      className={classnames(verticalLayoutClasses.footerContent, 'flex items-center justify-center flex-wrap gap-4')}
    >
      <p>
        ©Gerente Max Softwares
        <span>{` ${new Date().getFullYear()} `}</span>
      </p>
    </div>
  )
}

export default FooterContent
