// ** Types
import type { NavLink, NavGroup, HorizontalNavItemsType } from '@/@core/layouts/types'

// ** Custom Navigation Components
import HorizontalNavLink from '@/@layouts/components/horizontal/Navbar'

interface Props {
  hasParent?: boolean
  horizontalNavItems?: HorizontalNavItemsType
}

const resolveComponent = (item: NavGroup | NavLink) => {
  if ((item as NavGroup).children) return HorizontalNavLink

  return HorizontalNavLink
}

const HorizontalNavItems = (props: Props) => {
  const RenderMenuItems = props.horizontalNavItems?.map((item: NavGroup | NavLink, index: number) => {
    const TagName: any = resolveComponent(item)

    return <TagName {...props} key={index} item={item} />
  })

  return <>{RenderMenuItems}</>
}

export default HorizontalNavItems
