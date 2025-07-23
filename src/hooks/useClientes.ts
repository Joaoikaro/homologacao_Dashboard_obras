import { useQuery, useMutation } from '@tanstack/react-query'

import { httpClient } from '@/services/httpClient'
import type { AtualizarEmail, ClientesGeral } from '@/types/clientes'

export function useClientes() {
  const queryClientes = useQuery({
    queryKey: ['clientes'],
    queryFn: async (): Promise<ClientesGeral[]> => {
      const response = await httpClient.get<ClientesGeral[]>('Clientes')

      return response.data
    }
  })

  const queryPutAtualizarEmail = useMutation({
    mutationFn: async (body: AtualizarEmail): Promise<ClientesGeral[]> => {
      const response = await httpClient.put<ClientesGeral[]>(
        `Clientes/AtualizarEmail?id=${body.Id}&email=${body.Email}`
      )

      return response.data
    }
  })

  return {
    getAllClientes: queryClientes,
    putAtualizarEmail: queryPutAtualizarEmail
  }
}
