import { create } from 'zustand'

interface IAuthStore {
  signedIn: boolean
  isSystemsStep: boolean
  setSignedIn: (signedIn: boolean) => void
  setIsSystemsStep: (isSystemsStep: boolean) => void
  signOut: () => void
}

export const useAuthStore = create<IAuthStore>((set) => ({
  signedIn: typeof window !== 'undefined' && localStorage.getItem('isLogged') === 'true',
  isSystemsStep: false,
  setSignedIn: (signedIn) => {
    localStorage.setItem('isLogged', String(signedIn))
    set({ signedIn })
  },
  setIsSystemsStep: (isSystemsStep) => set({ isSystemsStep }),

  signOut: () => {
    localStorage.removeItem('isLogged')
    localStorage.removeItem('usuario')
    set({ signedIn: false })
  }
}))
