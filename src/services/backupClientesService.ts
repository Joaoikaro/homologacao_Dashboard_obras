import { httpClient } from '@/services/httpClient';
import type { BackupClientesGeral } from '@/types/backups';

export class BackupClienteService {

  static async getBackupClientes(): Promise<BackupClientesGeral[]> {
    const response = await httpClient.get<BackupClientesGeral[]>('clientes')

    return response.data
  }
}
