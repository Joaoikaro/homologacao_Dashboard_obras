export interface CreateFinanceiro {
  id: string,
  iDi: number,
  id_Importacao: number,
  nomeConta: string,
  nBanco: number,
  dataUltConciliacao: string,
  vlSaldo: number
}

export interface FinanceiroListarAgrupamento {
  agrupamento: string,
  agrupamento_Value: string,
  agrupamento_Caption: string,
  filtro: string,
  filtro_Value: string,
  qtde_Registro: number,
  total_Debito: number,
  total_Credito: number,
  valor_Periodo: number,
  valor_Inicial: number,
  valor_Final: number
}

export interface FinanceiroListarAgrupamentoFilters {
  Data_Inicio: string;
  Data_Fim: string;
  Coluna_Agrupamento?: string;
  Coluna_Filtro?: string;
  Valor_Filtro?: string | string[];
}
