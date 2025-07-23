import type { Attachment, CreateAttachment } from './attachment'
import type { Pessoa } from './pessoa'

export interface Etiqueta {
  icone: string
  icone_Base64: string
  cor_Primaria: string
  cor_Secundaria: string
  id: string
  id_Sequencia: number
  iDi: number
  desativadoSN: boolean
  data_Criacao: string
  data_Modificacao: string | null
  id_Usuario_Criacao: string
  id_Usuario_Modificacao: string | null
  iP_Criacao: string
  iP_Modificacao: string | null
  sincronizado_AppSN: boolean
  sincronizado_LocalSN: boolean
  id_Importacao: string | null
}

export interface UsuarioNivel {
  nome: string
  desc_Usuario_Nivel: string
  Etiqueta: Etiqueta
  id: string
  id_Sequencia: number
  iDi: number
  desativadoSN: boolean
  data_Criacao: string
  data_Modificacao: string | null
  id_Usuario_Criacao: string
  id_Usuario_Modificacao: string | null
  iP_Criacao: string
  iP_Modificacao: string | null
  sincronizado_AppSN: boolean
  sincronizado_LocalSN: boolean
  id_Importacao: string | null
}

export interface Usuario {
  nome: string
  email: string
  apelido: string
  menu_principal_personalizadoSN: boolean
  Usuario_Nivel: UsuarioNivel
  Anexo: Attachment[]
  id: string
  id_Sequencia: number
  iDi: number
  desativadoSN: boolean
  data_Criacao: string
  data_Modificacao: string | null
  id_Usuario_Criacao: string
  id_Usuario_Modificacao: string | null
  iP_Criacao: string
  iP_Modificacao: string | null
  sincronizado_AppSN: boolean
  sincronizado_LocalSN: boolean
  id_Importacao: string | null
}

export interface LoggedInUser {
  id: string
  nome: string
  email: string
  apelido: string
  id_Instalacao: number
  primeiro_AcessoSN: boolean

  Usuario_Nivel: UsuarioNivel
  Pessoa?: Pessoa
  Anexo?: Attachment[]
}

export interface CreateUser {
  id?: null
  Anexo?: CreateAttachment[]
  nome: string
  apelido: string
  email: string
  senha: string
  id_usuario_nivel: string
}

export interface UpdateUser {
  id?: string
  nome: string
  apelido?: string
  id_usuario_nivel: string
  desativadoSN?: boolean
}
