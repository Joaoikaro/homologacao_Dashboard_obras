import { create } from 'zustand'

// import type { BackupClientesGeral, BackupsClientesTotal } from '@/types/backups'
import type { ClientesGeral } from '@/types/clientes'

interface ClientesState {
  clientes: ClientesGeral[]
  setClientes: (clientes: ClientesGeral[]) => void
  clientesFiltrados: ClientesGeral[]
  setClientesFiltrados: (clientesFiltrados: ClientesGeral[]) => void
  openEditarModal: boolean
  setOpenEditarModal: (open: boolean) => void
  clienteClicado: ClientesGeral
  setClienteClicado: (cliente: ClientesGeral) => void
  clearClientes: () => void
}

export const useClientesStore = create<ClientesState>(set => ({
  clientes: [],
  setClientes: (clientes: ClientesGeral[]) => set({ clientes }),
  clientesFiltrados: [],
  setClientesFiltrados: (clientesFiltrados: ClientesGeral[]) => set({ clientesFiltrados }),
  openEditarModal: false,
  setOpenEditarModal: (open: boolean) => set({ openEditarModal: open }),
  clienteClicado: {
    Cliente: '',
    Email: '',
    IdCliente: 0,
    Modulo: '',
    Senha: '',
    StatusCliente: '',
    Tipo: '',
    MaxBackupSN: 0
  } as ClientesGeral,
  setClienteClicado: (cliente: ClientesGeral) => set({ clienteClicado: cliente }),
  clearClientes: () => set({ clientes: [], clientesFiltrados: [] })
}))
