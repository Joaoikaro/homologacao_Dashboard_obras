import { useQuery } from '@tanstack/react-query';

import { httpClient } from '@/services/httpClient';
import type { ObraListar } from '@/types/obra';


export function useObras() {
  const queryObras = useQuery({
    queryKey: ['obraListar'],
    queryFn: async (): Promise<ObraListar[]> => {
      const response = await httpClient.get<ObraListar[]>('v1/Dashboard_Obra/Listar');

      return response.data;
    },
  });

  return {
    obraListar: queryObras.data,
  };
}
