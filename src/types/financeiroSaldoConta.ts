export interface CreateFinanceiroSaldoConta {
    id: string,
    iDi: number,
    id_Importacao: number,
    nomeConta: string,
    nBanco: number,
    dataUltConciliacao: string,
    vlSaldo: number
  }

export interface FinanceiroSaldoContaResponse {
  id: string,
  id_Sequencia: number,
  iDi: number,
  desativadoSN: boolean,
  data_Criacao: string,
  data_Modificacao: string,
  id_Usuario_Criacao: string,
  id_Usuario_Modificacao: string,
  iP_Criacao: string,
  iP_Modificacao: string,
  sincronizado_AppSN: boolean,
  sincronizado_LocalSN: boolean,
  id_Importacao: number,
  nomeConta: string,
  nBanco: number,
  dataUltConciliacao: string,
  vlSaldo: number
  nBancoFormatado: string
}
