import { create } from 'zustand'

interface LoginType {
  Nome: string
  Senha: string
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
