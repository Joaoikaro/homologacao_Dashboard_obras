export interface BackupClientes  {
    Id: number;
    DataUltAtualizacao: string;
    IdTarefa: number;
    NomeTarefa: string;
    Desc_TipoTarefa: string;
    Id_TipoTarefa: number;
    StatusTarefa: number;
    IdCliente: number;
    NomeCliente:string;
    DescricaoTipo: string;
    BackupConfigLocalSN: boolean;
    BackupConfigDispExtSN: boolean;
    BackupConfigNuvemSN: boolean;
    TamanhoArquivoMb: string;
    DescricaoAgendamento: string;
    IdAgendamento: number;
    DataHoraBackupNuvem: string;
    DataHoraBackupExterno: string;
    DescricaoPrioridade: string
    BackupCompactadoSN: boolean;
    BackupCriptografadoSN: boolean;
    SenhaArqCriptografado: string;
    ArmazLocalTotalMb: string;
    ArmazLocalUsadoMb: string;
    ArmazDispExternoTotalMb: string;
    ArmazDispExternoUsadoMb: string;
    ArmazNuvemTotalMb: string;
    ArmazNuvemUsadoMb: string;
    VersaoApp: string;
    ServidorMAC: string;
    BackupResponsavel: string;
  }
