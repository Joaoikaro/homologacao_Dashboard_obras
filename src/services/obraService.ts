
import { httpClient } from '@/services/httpClient';
import type { ObraListar } from '@/types/obra';

export class ObrasService {
  static async getObraListar(): Promise<ObraListar> {
    const data = await httpClient.get('/v1/Dashboard_Obra/Listar');

    const response = data.data as ObraListar;

    return response;
  }
}
