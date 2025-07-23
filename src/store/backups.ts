import { create } from 'zustand'

import type { BackupClientesGeral, BackupsClientesTotal } from '@/types/backups'


interface BackupClientesState {
  backupClientes: BackupClientesGeral[]
  setBackupClientes: (backupClientes: BackupClientesGeral[]) => void
  backupsTotais: BackupsClientesTotal[]
  setBackupsTotais: (backupsTotais: BackupsClientesTotal[]) => void
  backupsFiltrados: BackupClientesGeral[]
  setBackupsFiltrados: (backupsFiltrados: BackupClientesGeral[]) => void
  backupClicado: BackupClientesGeral
  setBackupClicado: (backupClicado: BackupClientesGeral) => void
  openNaoEnviarModal: boolean
  setOpenNaoEnviarModal: (open: boolean) => void
  clearBackupClientes: () => void
}

export const useBackupClientes = create<BackupClientesState>((set) => ({
  backupClientes: [],
  setBackupClientes: (backupClientes: BackupClientesGeral[]) => set({ backupClientes }),
  backupsTotais: [],
  setBackupsTotais: (backupsTotais: BackupsClientesTotal[]) => set({ backupsTotais }),
  backupsFiltrados: [],
  setBackupsFiltrados: (backupsFiltrados: BackupClientesGeral[]) => set({ backupsFiltrados }),
  backupClicado: { Id: 0, IdCliente: 0, Id_TipoTarefa: 0, NomeTarefa: '', NomeCliente: '', DataUltAtualizacao: '' } as BackupClientesGeral,
  setBackupClicado: (backupClicado: BackupClientesGeral) => set({ backupClicado }),
  openNaoEnviarModal: false,
  setOpenNaoEnviarModal: (open: boolean) => set({ openNaoEnviarModal: open }),
  clearBackupClientes: () => set({ backupClientes: [] }),
}))
