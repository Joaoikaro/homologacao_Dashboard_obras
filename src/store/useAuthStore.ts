import type { NavigateFunction } from 'react-router-dom'
import { create } from 'zustand'

import { useUserLogadoInfo } from '@/store/userLogadoInfo'
import { queryClient } from '../lib/queryClient'
import storageKeys from '@/configs/storageKeys'

let navigateFn: NavigateFunction | null = null

export const setNavigateFn = (fn: NavigateFunction) => {
  navigateFn = fn
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
    console.log("Logout 1")
    localStorage.clear()
    console.log("Logout 2")
    set({ signedIn: false, isSystemsStep: false, token: '' })
    console.log("Logout3")
    queryClient.cancelQueries({ queryKey: ['loggedInUser'] })
    console.log("Logout 4")
    queryClient.removeQueries({ queryKey: ['loggedInUser'] })
    console.log("Logout 5")

    if (navigateFn) {
      console.log("Logout 6")
      navigateFn('/login')
    }
  },

  logoutSystem: () => {
    localStorage.removeItem(storageKeys.accessToken)
    queryClient.cancelQueries({ queryKey: ['loggedInUser'] })
    queryClient.removeQueries({ queryKey: ['loggedInUser'] })
    useUserLogadoInfo.getState().setUser({} as any)

    set({ signedIn: true, token: '', isSystemsStep: false })

    if (navigateFn) {
      navigateFn('/sistemas')
    } else {
      window.location.href = '/sistemas'
    }
  }
}))
