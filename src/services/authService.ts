import type { SignIn, SignInResponse } from '@/types/auth'
import { httpClient } from './httpClient'

export class AuthService {
  static async signIn({ Nome: usuario, Senha: senha }: SignIn): Promise<SignInResponse | null> {
    const response = await httpClient.get<SignInResponse[]>('backup/usuarios')

    const matchedUser = response.data.find(
      (user) => user.Nome === usuario && user.Senha === senha
    )

    if (matchedUser) {
      localStorage.setItem('usuario', JSON.stringify(matchedUser))
      localStorage.setItem('isLogged', 'true')

      return matchedUser
    }

    localStorage.removeItem('usuario')
    localStorage.removeItem('isLogged')
    
    return null
  }
}
