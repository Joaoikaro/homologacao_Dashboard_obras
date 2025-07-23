import type { AxiosResponseHeaders } from 'axios'

import type { CreateUser, LoggedInUser, UpdateUser, Usuario, UsuarioNivel } from '@/types/user'
import { parsePaginationHeaders } from '@/utils/pagination'
import { buildPaginationQuery, defaultParamsSerializer } from '@/utils/requestParams'

import { httpClient } from './httpClient'
import type { PaginatedResponse, PaginationParams } from '@/types/common/pagination'
import type { DefaultDataType } from '@/types/defaultDataType'
import { fetchAllPaginated } from '@/utils/fetchAllPaginated'

export class UserService {
  static async getUserById(id: string): Promise<Usuario> {
    const { data } = await httpClient.get<Usuario[]>('/v1/account/usuario/listar', {
      params: { id },
    })

    return data[0]
  }

  static async getAllUsers(params: PaginationParams): Promise<PaginatedResponse<Usuario>> {
    const { data, headers } = await httpClient.get<Usuario[]>('/v1/account/usuario/listar', {
      params: buildPaginationQuery(params),
      paramsSerializer: defaultParamsSerializer,
    })

    const paginationData = parsePaginationHeaders(headers as AxiosResponseHeaders)

    return {
      rows: data,
      ...paginationData,
    }
  }

  static async getAllUserLevels<T extends DefaultDataType = DefaultDataType>(
    params: PaginationParams<T>,
  ): Promise<PaginatedResponse<UsuarioNivel>> {
    const { data, headers } = await httpClient.get<UsuarioNivel[]>(
      '/v1/core/usuario_nivel/listar',
      {
        params: buildPaginationQuery(params),
        paramsSerializer: defaultParamsSerializer,
      },
    )

    const paginationData = parsePaginationHeaders(headers as AxiosResponseHeaders)

    return {
      rows: data,
      ...paginationData,
    }
  }

  static async getAllUserLevelsComplete(): Promise<UsuarioNivel[]> {
    return fetchAllPaginated<UsuarioNivel>((params: any) => UserService.getAllUserLevels(params))
  }

  static async getLoggedInUser(): Promise<LoggedInUser> {
    const { data } = await httpClient.get<LoggedInUser>('/v1/account/usuario/listar/logado')

    return data
  }

  static async createUser(body: CreateUser[]): Promise<Usuario[]> {
    const { data } = await httpClient.post<Usuario[]>('/v1/account/usuario/criar', body)


return data
  }

  static async updateUser(body: UpdateUser[]): Promise<Usuario[]> {
    const { data } = await httpClient.put<Usuario[]>('/v1/account/usuario/atualizar', body)


return data
  }

  static async updateEmail(payload: {
    id_usuario: string
    senha_atual: string
    email_atual: string
    novo_email: string
    confirma_email: string
  }): Promise<void> {
    await httpClient.put('/v1/account/usuario/atualizar/email', payload)
  }

  static async updatePassword(payload: {
    id_usuario: string
    senha_atual: string
    nova_senha: string
    confirma_senha: string
  }): Promise<void> {
    await httpClient.put('/v1/account/usuario/atualizar/senha', payload)
  }
}
