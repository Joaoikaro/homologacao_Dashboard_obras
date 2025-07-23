import axios from 'axios'
import { enqueueSnackbar } from 'notistack'

import storageKeys from '@/configs/storageKeys'
import { useAuthStore } from '@/store/useAuthStore'

export const httpClient = axios.create({
  baseURL: 'https://gerentemax-dev2.azurewebsites.net/api',
  timeout: 30000,
})

httpClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(storageKeys.accessToken)

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const signOut = useAuthStore.getState().signOut

    if (error.response?.status === 401) {
      signOut()
    }

    if (error.response?.status === 500) {
      enqueueSnackbar(
        'Erro interno no servidor. Por favor, contate o administrador do sistema.',
        {
          variant: 'error',
        },
      )
      signOut()
    }

    return Promise.reject(error)
  },
)
