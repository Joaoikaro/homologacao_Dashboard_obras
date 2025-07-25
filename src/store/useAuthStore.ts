import type { NextRouter } from 'next/router'

import { create } from 'zustand'

import { queryClient } from '../lib/queryClient'
import storageKeys from '@/configs/storageKeys'
import { useUserLogadoInfo } from '@/store/userLogadoInfo'

let router: NextRouter | null = null

export const setRouter = (r: NextRouter) => {
  router = r
}

interface IAuthStore {
  signedIn: boolean
  isSystemsStep: boolean
  token: string
  setSignedIn: (signedIn: boolean) => void
  setIsSystemsStep: (isSystemsStep: boolean) => void
  setToken: (token: string) => void
  signOut: () => void
  logoutSystem: () => void
  initialize: () => void
}

export const useAuthStore = create<IAuthStore>((set) => ({
  signedIn: false,
  isSystemsStep: false,
  token: '',

  setSignedIn: (signedIn) => set({ signedIn }),
  setIsSystemsStep: (isSystemsStep) => set({ isSystemsStep }),
  setToken: (token) => set({ token }),

  initialize: () => {
    const token = localStorage.getItem(storageKeys.accessToken)

    if (token) {
      set({ token, signedIn: true })
    }
  },

  signOut: () => {
    localStorage.clear()
    set({ signedIn: false, isSystemsStep: false, token: '' })
    queryClient.cancelQueries({ queryKey: ['loggedInUser'] })
    queryClient.removeQueries({ queryKey: ['loggedInUser'] })

    if (router) {
      router.push('/login')
    } else {
      window.location.href = '/login'
    }
  },

  logoutSystem: () => {
    localStorage.removeItem(storageKeys.accessToken)
    queryClient.cancelQueries({ queryKey: ['loggedInUser'] })
    queryClient.removeQueries({ queryKey: ['loggedInUser'] })
    useUserLogadoInfo.getState().setUser({} as any)

    set({ signedIn: true, token: '', isSystemsStep: false })

    if (router) {
      router.push('/sistemas')
    } else {
      window.location.href = '/sistemas'
    }
  }
}))
