// Type Imports
import type { ThemeColor } from '@core/types'
import type { OptionsMenuType } from '@core/components/option-menu/types'
import type { CustomAvatarProps } from '@core/components/mui/Avatar'

export type CardStatsCustomerStatsProps = {
  title: string
  avatarIcon: string
  color?: ThemeColor
  description: string
} & (
    | {
      stats?: string
      content?: string
      chipLabel?: never
    }
    | {
      chipLabel?: string
      stats?: never
      content?: never
    }
  )

export type CardStatsType = {
  customerStats: CardStatsCustomerStatsProps[]
  statsVertical: CardStatsVerticalProps[]
  statsCharacter: CardStatsCharacterProps[]
}

export type CardStatsVerticalProps = {
  title: string
  stats: string
  avatarIcon?: string
  subtitle: string
  avatarColor?: ThemeColor
  trendNumber?: string
  trend?: 'positive' | 'negative'
  avatarSkin?: CustomAvatarProps['skin']
  avatarSize?: number
  moreOptions?: OptionsMenuType
  disableMenu?: boolean
  disableIcon?: boolean
}

export type CardStatsCharacterProps = {
  src: string
  title: string
  stats: string
  chipText: string
  trendNumber: string
  chipColor?: ThemeColor
  trend?: 'positive' | 'negative'
}
