import type { FinanceiroListarAgrupamento, FinanceiroListarAgrupamentoFilters } from '@/types/fincanceiro';

import { httpClient } from '@/services/httpClient';
import { defaultParamsSerializer } from '../utils/requestParams';

export type FinanceiroParams = {
  Data_Inicio: string;
  Data_Fim: string;
  Coluna_Agrupamento?: string;
  Coluna_Filtro?: string;
  Valor_Filtro?: string | string[];
}

export class FinanceiroService {
  static async getFinanceiroListarAgrupamento(params: FinanceiroListarAgrupamentoFilters): Promise<FinanceiroListarAgrupamento> {
    const data = await httpClient.get('/v1/Dashboard_Financeiro/Listar_Agrupamento', {
      params: params,
      paramsSerializer: defaultParamsSerializer
    });


    const response = data.data as FinanceiroListarAgrupamento;

    return response;
  }
}
