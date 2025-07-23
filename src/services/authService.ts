import type { SignIn, SignInResponse, Tenant, TenentResponse } from '@/types/auth'

import { httpClient } from './httpClient'

export class AuthService {
  static async tenant({ email, senha }: Tenant) {
    return await httpClient.post<TenentResponse[]>('/v1/auth/sistema', {
      email,
      senha,
    })
  }

  static async signIn({ email, senha, idTenant }: SignIn) {
    return await httpClient.post<SignInResponse>('/v1/auth/login', {
      email,
      senha,
      id_sistema: idTenant,
    })
  }
}
