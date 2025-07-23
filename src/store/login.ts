import { create } from 'zustand'

interface LoginType {
  email: string
  senha: string
}

interface LoginState {
  login: LoginType | null
  setLogin: (login: LoginType) => void
}

export const useLoginState = create<LoginState>((set) => ({
  login: null,
  setLogin: (login: LoginType) =>
    set(() => ({
      login,
    })),
}))
