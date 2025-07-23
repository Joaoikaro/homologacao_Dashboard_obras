export interface BackupClientesGeral {
  Id: number,
  IdCliente: number,
  NomeCliente: string,
  NomeTarefa: string,
  DescricaoAgendamento: string,
  DataUltAtualizacao: string,
  MaxVersaoApp: string,
  Id_TipoTarefa: number,
  Desc_TipoTarefa: string,
  BackupResponsavel: string,
  Dias: number,
  Atrasado: number
}

export interface BackupsClientesTotal {
  Id_TipoTarefa: number,
  Desc_TipoTarefa: string,
  AtrasadoMais1Dia: number,
  AtrasadosHoje: number,
  TotalAtrasados: number,
  ClientesAtrasados: number,
  BackupEmDia: number,
  TotalRegistros: number,
  TotalClientes: number
}

export interface NaoEnviar {
  Id: number
}
