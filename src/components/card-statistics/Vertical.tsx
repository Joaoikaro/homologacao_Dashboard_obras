// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Types Imports
import type { CardStatsVerticalProps } from '@/types/pages/widgetTypes'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'
import OptionMenu from '@core/components/option-menu'

const CardStatVertical = (props: CardStatsVerticalProps) => {
  // Props
  const { title, stats, avatarIcon, avatarColor, trendNumber, trend, subtitle, avatarSkin, avatarSize, moreOptions, disableMenu, disableIcon } =
    props

  return (
    <Card className='bs-full' style={{ border: '1px solid var(--mui-palette-divider)' }}>
      <CardContent>
        {disableIcon && disableMenu ? null : (
          <div className='flex justify-between items-center is-full mbe-5'>
            {disableIcon ? null : (
              <CustomAvatar color={avatarColor} skin={avatarSkin} size={avatarSize} className='shadow-xs'>
                <i className={avatarIcon} />
              </CustomAvatar>
            )}

            {disableMenu ? null : (
              <OptionMenu
                {...(moreOptions
                  ? moreOptions
                  : {
                    options: ['Recarregar', 'Compartilhar', 'Atualizar'],
                    iconButtonProps: { className: 'text-textPrimary' }
                  })}
              />
            )}

          </div>
        )}
        <div className='flex flex-col gap-1'>
          <Typography color='text.primary' className='font-medium'>
            {title}
          </Typography>
          <div className='flex gap-x-2 gap-y-0.5 items-center flex-wrap'>
            <Typography variant='h4'>{stats}</Typography>
            {trendNumber && (
              <Typography color={trend === 'negative' ? 'error.main' : 'success.main'}>
                {`${trend === 'negative' ? '-' : '+'}${trendNumber}`}
              </Typography>
            )}
          </div>
          <Typography variant='body2'>{subtitle}</Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardStatVertical
