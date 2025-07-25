import { useCallback } from 'react'

import { useRouter } from 'next/navigation'

import { useMutation, useQuery } from '@tanstack/react-query'

import { useAuthStore } from '@/store/useAuthStore'
import type { SignIn, Tenant } from '@/types/auth'
import type { LoggedInUser } from '@/types/user'
import storageKeys from '@/configs/storageKeys'
import { AuthService } from '@/services/authService'
import { useUserLogadoInfo } from '@/store/userLogadoInfo'
import { UserService } from '@/services/userService'

export function useAuth() {
  const { signedIn, setSignedIn, isSystemsStep, setIsSystemsStep, token, setToken } = useAuthStore()
  const router = useRouter()

  const { setUser } = useUserLogadoInfo()

  const signInMutation = useMutation({
    mutationFn: async (formData: SignIn) => AuthService.signIn(formData),
    onSuccess: ({ data }) => {
      setSignedIn(true)
      setIsSystemsStep(false)
      localStorage.setItem(storageKeys.accessToken, data.token)
      setToken(data.token)
    },
    onError: (err: Error) => {
      console.error('Erro de autenticação:', err)
    },
  })

  const signIn = useCallback(
    ({ email, senha, idTenant }: SignIn) => {
      return signInMutation.mutateAsync({ email, senha, idTenant })
    },
    [signInMutation],
  )

  const tenantMutation = useMutation({
    mutationFn: async (formData: Tenant) => AuthService.tenant(formData),
    onSuccess: () => {
      setIsSystemsStep(true)
      router.push('/sistemas')
    },
    onError: (err: Error) => {
      console.error('Erro de autenticação:', err)
    },
  })

  const selectTenant = useCallback(
    ({ email, senha }: Tenant) => {
      return tenantMutation.mutateAsync({ email, senha })
    },
    [tenantMutation],
  )

  const loggedInUser = useQuery({
    queryKey: ['loggedInUser', token],
    enabled: !!token && signedIn,
    queryFn: async (): Promise<LoggedInUser> => {
      const user = await UserService.getLoggedInUser()

      setUser(user)

return user
    },
  })

  return {
    signIn,
    selectTenant,
    signInLoading: signInMutation.isPending,
    tenantLoading: tenantMutation.isPending,
    signedIn,
    isSystemsStep,
    loggedInUser,
  }
}
