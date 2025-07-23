'use client'

import Link from 'next/link'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const NotFound = () => {
  return (
    <div className='flex items-center justify-center min-bs-[100dvh] relative p-6 overflow-x-hidden'>
      <div className='flex items-center flex-col text-center gap-10'>
        <div className='flex flex-col gap-2 is-[90vw] sm:is-[unset]'>
          <Typography className='font-medium text-8xl' color='text.primary'>
            404
          </Typography>
          <Typography variant='h4'>Página não encontrada</Typography>
          <Typography>Não conseguimos encontrar a p&aacute;gina que voc&ecirc; procurava</Typography>
        </div>
        <img
          alt='error-illustration'
          src='/images/illustrations/characters/5.png'
          className='object-cover bs-[400px] md:bs-[450px] lg:bs-[500px]'
        />
        <Button href='/' component={Link} variant='contained'>
          Voltar ao inicio
        </Button>
      </div>
    </div>
  )
}

export default NotFound
