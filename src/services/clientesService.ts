import type { ClientesGeral } from '@/types/clientes'
import { httpClient } from './httpClient'

export class ClientesService {
  static async getClientes(): Promise<ClientesGeral[]> {
    const response = await httpClient.get<ClientesGeral[]>('backup/clientes/geral')

    return response.data
  }

  static async getClientesTotal(): Promise<ClientesGeral[]> {
    const response = await httpClient.get<ClientesGeral[]>('backup/clientes/geral/total')

    return response.data
  }
}
