/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { Grid } from '@mui/material'

import { Typography, Backdrop, CircularProgress, Container, TextField } from '@mui/material'

import { useAuth } from '@/hooks/useAuth'
import { useLoginState } from '@/store/login'
import useTenants from '@/store/tenant'
import { useAuthStore } from '@/store/useAuthStore'
import type { TenentResponse } from '@/types/auth'
import { useUserLogadoInfo } from '../store/userLogadoInfo';
import CardStatVertical from '@/components/card-statistics/Vertical'
import storageKeys from '@/configs/storageKeys'

export default function Sistemas() {
  const router = useRouter()
  const { tenets } = useTenants()
  const { login } = useLoginState()
  const { signIn, loggedInUser } = useAuth()
  const { setUser } = useUserLogadoInfo()

  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const filteredTenants = tenets.filter(tenant =>
    tenant.desc_Sistema?.toLowerCase().includes(search.toLowerCase())
  )

  const handleLogin = async (tenant: TenentResponse) => {
    if (!login?.email || !login?.senha) return

    try {
      setLoading(true)

      const payload = {
        email: login.email,
        senha: login.senha,
        idTenant: tenant.id
      }

      const response = await signIn(payload)
      const token = response.data.token
      const usuarioLogado = await loggedInUser

      if (usuarioLogado?.data) {
        setUser(usuarioLogado.data)
      }

      localStorage.setItem(storageKeys.accessToken, token)
      useAuthStore.getState().setSignedIn(true)
      useAuthStore.getState().setIsSystemsStep(true)

      router.replace('/')
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      setLoading(false)
    } finally {
      null
    }
  }

  useEffect(() => {
    if (!login?.email || !login?.senha) {
      router.replace('/login')
    }
  }, [])

  return (
    <div>
      <Container component="main" maxWidth="xl" sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Selecione um sistema
        </Typography>

        <TextField
          label="Pesquisar Sistema"
          value={search}
          onChange={e => setSearch((e.target as HTMLInputElement).value)}
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{ mb: 4 }}
        />


        <Grid container spacing={4} sx={{ overflowY: 'auto', maxHeight: '60vh' }}>
          {filteredTenants.length > 0 ? (
            filteredTenants.map(tenant => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} className='self-end' key={tenant.id} onClick={() => handleLogin(tenant)} style={{ cursor: 'pointer' }}>
                <CardStatVertical
                  title={tenant.desc_Sistema}
                  stats={tenant.cliente?.nome_Razao_Social || 'N/A'}
                  disableIcon={true}
                  subtitle={tenant.cliente?.apelido_Fantasia || 'Apelido'}
                  disableMenu={true}
                />
              </Grid>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary">
              Nenhum sistema encontrado.
            </Typography>
          )}

        </Grid>

      </Container>

      <Backdrop
        sx={theme => ({ color: '#00000047000', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}
