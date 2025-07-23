import { httpClient } from '@/services/httpClient';
import type { BackupsClientesTotal } from '@/types/backups';

export class BackupClientesTotalService {

  static async getBackupClientes(): Promise<BackupsClientesTotal[]> {
    const response = await httpClient.get<BackupsClientesTotal[]>('backup/clientes/geral/total')

    return response.data
  }
}
