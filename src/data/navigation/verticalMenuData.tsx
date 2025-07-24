// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'

const verticalMenuData = (): VerticalMenuDataType[] => [
  // This is how you will normally render submenu
  {
    label: 'Dashboards',
    icon: 'ri-home-smile-line',
    suffix: {
      label: '5',
      color: 'error'
    },
    children: [
      {
        label: 'Inicio',
        href: '/inicio'
      },
    ]
  },
]

export default verticalMenuData
