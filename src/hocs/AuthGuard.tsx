/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { useAuthStore } from '@/store/useAuthStore'

interface Props {
  children: React.ReactNode
  locale?: string
}

const AuthGuard = ({ children }: Props) => {
  const [authChecked, setAuthChecked] = useState(false)

  const router = useRouter()
  const signedIn = useAuthStore(state => state.signedIn)
  const initialize = useAuthStore(state => state.initialize)

 useEffect(() => {
  initialize()
  setAuthChecked(true)
}, [])

useEffect(() => {
  if (authChecked && !signedIn) {
    router.replace('/teste')
  }
}, [authChecked, signedIn, router])

if (!authChecked || !signedIn) return null

return <>{children}</>
}

export default AuthGuard
