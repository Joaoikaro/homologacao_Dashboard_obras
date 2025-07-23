import { create } from 'zustand'

import type { SignInResponse } from '@/types/auth'

interface UserLogadoInfoState {
  user: SignInResponse | null
  setUser: (user: SignInResponse) => void
  clearUser: () => void
}

export const useUserLogadoInfo = create<UserLogadoInfoState>((set) => {
  const storedUser = localStorage.getItem('usuario')
  const parsedUser = storedUser ? JSON.parse(storedUser) as SignInResponse : null

  return {
    user: parsedUser,
    setUser: (user: SignInResponse) => {
      localStorage.setItem('usuario', JSON.stringify(user))
      set({ user })
    },
    clearUser: () => {
      localStorage.removeItem('usuario')
      set({ user: null })
    },
  }
})
