'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import classnames from 'classnames'

import type { Mode } from '@core/types'

import Link from '@components/Link'
import Logo from '@components/layout/shared/Logo'
import Illustrations from '@components/Illustrations'

import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'
import type { LoginSchema } from '@/validations/LoginValidation'
import { loginSchema } from '@/validations/LoginValidation'
import { AuthService } from '@/services/authService'
import TextFieldMax from '@/@core/components/textFieldMax'

// import { useLoginState } from '@/store/login'
import { useUserLogadoInfo } from '@/store/userLogadoInfo'
import { useAuthStore } from '@/store/useAuthStore'

const Login = ({ mode }: { mode: Mode }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const darkImg = '/images/pages/auth-v2-mask-dark.png'
  const lightImg = '/images/pages/auth-v2-mask-light.png'

  const router = useRouter()
  const { settings } = useSettings()
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const [loading, setLoading] = useState(false)
  const { setSignedIn } = useAuthStore()
  const { setUser } = useUserLogadoInfo()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      Nome: '',
      Senha: ''
    }
  })

  useEffect(() => {
    if (localStorage.getItem('isLogged') === 'true' && localStorage.getItem('usuario')) {
      router.push('/dashboard/backups')
    } else {
      localStorage.removeItem('isLogged')
      localStorage.removeItem('usuario')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async ({ Nome, Senha }: LoginSchema) => {
    setLoading(true)

    try {
      const user = await AuthService.signIn({ Nome, Senha })

      console.log('caiu aqui')
      console.log(user)

      if (user !== null) {
        setSignedIn(true)
        setUser(user)
        router.push('/dashboard/backups')
      } else {
        setErrorLogin({ mensage: 'Usuário ou senha inválidos', active: true })
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      setErrorLogin({ mensage: 'Erro ao se conectar', active: true })
    } finally {
      setLoading(false)
    }
  }

  const [errorLogin, setErrorLogin] = useState({
    mensage: '',
    active: false
  } as { mensage: string; active: boolean })

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <div className='plb-12 pis-12'>
          <img
            src={'/images/G-logo.png'}
            draggable={false}
            alt='character-illustration'
            className='max-bs-[500px] max-is-full bs-auto'
          />
        </div>
        <Illustrations image1={null} image2={null} maskImg={{ src: authBackground }} />
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <Link className='absolute block-start-5 sm:block-start-[38px] inline-start-6 sm:inline-start-[38px]'>
          <Logo />
        </Link>
        <div className='flex flex-col gap-5 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset]'>
          <div className='flex flex-col items-center'>
            <img
              draggable={false}
              style={{ width: '70%' }}
              src={settings.mode === 'light' ? '/images/MaxBackup.png' : '/images/MaxBackup_branca.png'}
              alt='Logo'
            />
            <Typography className='mbs-1'>Insira seu usuário e senha para continuar</Typography>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
            <TextFieldMax
              autoFocus
              disabled={loading}
              fullWidth
              error={!!errors.Nome}
              helperText={errors.Nome?.message}
              control={control}
              label='Usuário'
              name='Nome'
              type='text'
            />

            <TextFieldMax
              fullWidth
              name='Senha'
              control={control}
              error={!!errors.Senha}
              helperText={errors.Senha?.message}
              label='Senha'
              disabled={loading}
              type={isPasswordShown ? 'text' : 'password'}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        size='small'
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={e => e.preventDefault()}
                      >
                        <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
            />
            {errorLogin.active && <Typography color='error'>{errorLogin.mensage}</Typography>}
            <Button fullWidth variant='contained' type='submit'>
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
