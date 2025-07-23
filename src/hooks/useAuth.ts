import { useCallback } from 'react'

import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { useAuthStore } from '@/store/useAuthStore'
import type { SignIn } from '@/types/auth'
import { AuthService } from '@/services/authService'
import { useUserLogadoInfo } from '@/store/userLogadoInfo'

export function useAuth() {
  const navigate = useNavigate()
  const { signedIn, setSignedIn, isSystemsStep, setIsSystemsStep } = useAuthStore()
  const { setUser } = useUserLogadoInfo()

  const signInMutation = useMutation({
    mutationFn: async (formData: SignIn) => {
      const user = await AuthService.signIn(formData)

      if (!user) throw new Error('Usuário ou senha inválidos')

      return user
    },
    onSuccess: (user) => {
      setSignedIn(true)
      setIsSystemsStep(false)
      setUser(user)
      navigate('/dashboard/backups')
    },
    onError: (err: Error) => {
      console.error('Erro ao fazer login:', err.message)
    }
  })

  const signIn = useCallback(
    ({ Nome, Senha }: SignIn) => {
      return signInMutation.mutateAsync({ Nome, Senha })
    },
    [signInMutation]
  )

  const isLoggedIn = localStorage.getItem('isLogged') === 'true'
  const loggedUser = localStorage.getItem('usuario')
  const parsedUser = loggedUser ? JSON.parse(loggedUser) : null

  // Seta o user global se já estiver logado (pode mover pro contexto também)
  if (isLoggedIn && parsedUser) {
    setSignedIn(true)
    setUser(parsedUser)
  }

  return {
    signIn,
    signInLoading: signInMutation.isPending,
    signedIn,
    isSystemsStep,
    user: parsedUser,
  }
}
