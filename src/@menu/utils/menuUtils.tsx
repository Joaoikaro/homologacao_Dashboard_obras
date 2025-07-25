// React Imports
import { isValidElement } from 'react'
import type { ReactElement, ReactNode } from 'react'

// Third-party Imports
import type { CSSObject } from '@emotion/styled'

// Type Imports
import type { ChildrenType, RenderExpandedMenuItemIcon } from '../types'

import { menuClasses } from './menuClasses'

// Styled Component Imports
import StyledMenuIcon from '../styles/StyledMenuIcon'

type RenderMenuIconParams = {
  level?: number
  active?: boolean
  disabled?: boolean
  styles?: CSSObject
  icon?: ReactElement
  renderExpandedMenuItemIcon?: RenderExpandedMenuItemIcon
  isBreakpointReached?: boolean
}

export const confirmUrlInChildren = (children: ChildrenType['children'], url: string): boolean => {
  if (!children) {
    return false
  }

  if (Array.isArray(children)) {
    return children.some((child: ReactNode) => confirmUrlInChildren(child, url))
  }

  if (isValidElement(children)) {
    const { component, href, exactMatch, activeUrl, children: subChildren } = children.props

    if (component && component.props.href) {
      return exactMatch === true || exactMatch === undefined
        ? component.props.href === url
        : activeUrl && url.includes(activeUrl)
    }

    if (href) {
      return exactMatch === true || exactMatch === undefined ? href === url : activeUrl && url.includes(activeUrl)
    }

    if (subChildren) {
      return confirmUrlInChildren(subChildren, url)
    }
  }

  return false
}


/**
 * Processes children of a HorizontalMenu component to either generate a vertical menu directly
 * from menuData or apply a transformation function to each child.
 *
 * @param {ReactNode} children - The children of the HorizontalMenu component.
 * @param {Function} mapFunction - A function to transform each child that doesn't have menuData.
 * @returns {ReactNode} The processed children suitable for inclusion in a VerticalMenu.
 */

/**
 * Transforms a hierarchy of horizontal menu components (HorizontalMenuItem,
 * HorizontalSubMenu, and HorizontalMenu) into their vertical equivalents.
 *
 * @param {ReactNode} children - The children of the menu to be transformed.
 * @returns {ReactNode} The transformed menu as a hierarchy of vertical menu components.
 */

/*
 * Render all the icons for Menu Item and SubMenu components for all the levels more than 0
 */
export const renderMenuIcon = (params: RenderMenuIconParams) => {
  const { icon, level, active, disabled, styles, renderExpandedMenuItemIcon, isBreakpointReached } = params

  if (icon && (level === 0 || (!isBreakpointReached && level && level > 0))) {
    return (
      <StyledMenuIcon className={menuClasses.icon} rootStyles={styles}>
        {icon}
      </StyledMenuIcon>
    )
  }

  if (
    level &&
    level !== 0 &&
    renderExpandedMenuItemIcon &&
    renderExpandedMenuItemIcon.icon !== null &&
    (!renderExpandedMenuItemIcon.level || renderExpandedMenuItemIcon.level >= level)
  ) {
    const iconToRender =
      typeof renderExpandedMenuItemIcon.icon === 'function'
        ? renderExpandedMenuItemIcon.icon({ level, active, disabled })
        : renderExpandedMenuItemIcon.icon

    if (iconToRender) {
      return (
        <StyledMenuIcon className={menuClasses.icon} rootStyles={styles}>
          {iconToRender}
        </StyledMenuIcon>
      )
    }
  }

  return null
}
