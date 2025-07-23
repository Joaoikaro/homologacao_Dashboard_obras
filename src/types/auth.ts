export interface SignIn {
  email: string
  senha: string
  idTenant: string
}

export interface SignInResponse {
  token: string
}

export interface Tenant {
  email: string
  senha: string
}

export interface Cliente {
  nome_Razao_Social: string,
  apelido_Fantasia: string,
  cpF_CNPJ: string,
  id: string,
  id_Sequencia: number,
  iDi: number,
  desativadoSN: boolean,
  data_Criacao: string,
  data_Modificacao: string | null,
  id_Usuario_Criacao: string,
  id_Usuario_Modificacao: string | null,
  iP_Criacao: string,
  iP_Modificacao: string | null,
  sincronizado_AppSN: boolean,
  sincronizado_LocalSN: boolean,
  id_Importacao: number | null,
}

export interface TenentResponse {
  data_Criacao: string
  data_Modificacao: null
  desativadoSN: boolean
  desc_Sistema: string
  iDi: number
  iP_Criacao: string
  iP_Modificacao: null
  id: string
  id_Sequencia: number
  id_Usuario_Criacao: string
  id_Usuario_Modificacao: null
  sincronizadoSN: boolean
  cliente: Cliente
}
