import { create } from 'zustand'

import type { LoggedInUser } from '@/types/user'

interface userLogadoInfoState {
  user: LoggedInUser
  setUser: (user: LoggedInUser) => void
}

export const useUserLogadoInfo = create<userLogadoInfoState>((set) => ({
  user: {} as LoggedInUser,
  setUser: (user: LoggedInUser) =>
    set(() => ({
      user,
    })),
}))
