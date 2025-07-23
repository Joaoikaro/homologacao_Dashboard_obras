import { useMutation, useQuery } from '@tanstack/react-query'

import { httpClient } from '@/services/httpClient'
import type { BackupClientesGeral, BackupsClientesTotal, NaoEnviar } from '@/types/backups'

// import { NaoEnviar } from '@/types/clientes'

export function useBackupCliente() {
  const queryBackups = useQuery({
    queryKey: ['backups'],
    queryFn: async (): Promise<BackupClientesGeral[]> => {
      const response = await httpClient.get<BackupClientesGeral[]>('backup/clientes/geral')

      return response.data
    }
  })

  const queryTotais = useQuery({
    queryKey: ['backupsTotal'],
    queryFn: async (): Promise<BackupsClientesTotal[]> => {
      const response = await httpClient.get<BackupsClientesTotal[]>('backup/clientes/geral/total')

      return response.data
    }
  })

  const mutationPutNaoEnviar = useMutation({
    mutationFn: async (body: NaoEnviar): Promise<BackupClientesGeral[]> => {
      const response = await httpClient.put<BackupClientesGeral[]>(`Backup/Clientes/NaoEnviar?id=${body.Id}`)

      return response.data
    }
  })

  return {
    getAllBackups: queryBackups,
    getAllTotais: queryTotais,
    putNaoEnviar: mutationPutNaoEnviar
  }
}
