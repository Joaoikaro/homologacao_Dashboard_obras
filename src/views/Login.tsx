'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, minLength, string, email, pipe, nonEmpty } from 'valibot'
import classnames from 'classnames'
import type { SubmitHandler } from 'react-hook-form'
import type { InferInput } from 'valibot'

import { CircularProgress } from '@mui/material'

import type { Mode } from '@core/types'
import Illustrations from '@components/Illustrations'
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'
import { useAuthStore } from '@/store/useAuthStore'
import { useAuth } from '@/hooks/useAuth'
import useTenants from '@/store/tenant'
import { useLoginState } from '../store/login';

type ErrorType = {
  message: string[]
}

type FormData = InferInput<typeof schema>

const schema = object({
  email: pipe(string(), minLength(1, 'This field is required'), email('Please enter a valid email address')),
  senha: pipe(
    string(),
    nonEmpty('This field is required'),
    minLength(5, 'Password must be at least 5 characters long')
  )
})

const Login = ({ mode }: { mode: Mode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [errorState, setErrorState] = useState<ErrorType | null>(null)
  const [loading, setLoading] = useState(false)

  // Vars
  const darkImg = '/images/pages/auth-v2-mask-dark.png'
  const lightImg = '/images/pages/auth-v2-mask-light.png'
  const darkIllustration = '/images/gerentemax/G-logo.png'
  const lightIllustration = '/images/gerentemax/G-logo.png'
  const borderedDarkIllustration = '/images/gerentemax/G-logo.png'
  const borderedLightIllustration = '/images/gerentemax/G-logo.png'

  const darkGerenteMax = '/images/gerentemax/Logo_branca.png'
  const lightGerenteMax = '/images/gerentemax/Logo.png'

  // Hooks
  const router = useRouter()
  const { settings } = useSettings()
  const { setLogin } = useLoginState()
  const { setTenent } = useTenants()
  const { selectTenant } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: valibotResolver(schema),
    defaultValues: {
      email: 'joaoikaro@gerentemax.com',
      senha: '123456'
    }
  })

  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const loginImage = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const gerenteMaxLogo = useImageVariant(
    mode,
    lightGerenteMax,
    darkGerenteMax,
  )

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const onSubmit: SubmitHandler<FormData> = async ({ email, senha }) => {

    try {
      setLoading(true)
      const { data } = await selectTenant({ email, senha })

      setLogin({ email, senha })
      setTenent(data)
      useAuthStore.getState().setSignedIn(false)
      useAuthStore.getState().setIsSystemsStep(false)

      router.replace('/sistemas')
    } catch {
      setLoading(false)
      setErrorState({ message: ['E-mail ou senha inválidos'] })
    }
  }


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
            draggable={false}
            src={loginImage}
            className='max-bs-[500px] max-is-full bs-auto'
          />
        </div>
        <Illustrations
          image1={null}
          image2={null}
          maskImg={{ src: authBackground }}
        />
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>

        <div className='flex flex-col gap-5 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset]'>
          <div className='flex flex-col items-center'>
            <img
              src={gerenteMaxLogo}
              draggable={false}
              alt='character-illustration'
              className='max-bs-[400px] max-is-full bs-auto'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Typography
              variant='h5'
              className='text-center'
              color='text.secondary'
            />
            <Typography>Insira suas credenciais para continuar</Typography>
          </div>

          <form
            noValidate
            action={() => { }}
            autoComplete='off'
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-5'
          >
            <Controller
              name='email'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  autoFocus
                  type='email'
                  label='Email'
                  onChange={e => {
                    field.onChange(e.target.value)
                    errorState !== null && setErrorState(null)
                  }}
                  {...((errors.email || errorState !== null) && {
                    error: true,
                    helperText: errors?.email?.message || errorState?.message[0]
                  })}
                />
              )}
            />
            <Controller
              name='senha'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='Senha'
                  id='login-password'
                  type={isPasswordShown ? 'text' : 'password'}
                  onChange={e => {
                    field.onChange(e.target.value)
                    errorState !== null && setErrorState(null)
                  }}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            size='small'
                            edge='end'
                            onClick={handleClickShowPassword}
                            onMouseDown={e => e.preventDefault()}
                            aria-label='toggle password visibility'
                          >
                            <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                  }}
                  {...(errors.senha && { error: true, helperText: errors.senha.message })}
                />
              )}
            />

            <Button disabled={loading} fullWidth variant='contained' type='submit' endIcon={loading ? <CircularProgress color='inherit' size={20} /> : <i className='ri-arrow-right-line' />}>
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
