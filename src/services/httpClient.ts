import axios from 'axios'
import { enqueueSnackbar } from 'notistack'

import { useAuthStore } from '@/store/useAuthStore'

export const httpClient = axios.create({
  baseURL: 'https://apimaxbackup.somee.com/api',
  timeout: 30000,
})

httpClient.interceptors.request.use(
  (config) => {
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
        'Erro interno no servidor. Por favor contate o desenvolvimento.',
        {
          variant: 'error',
        },
      )
      signOut()
    }

    return Promise.reject(error)
  },
)
