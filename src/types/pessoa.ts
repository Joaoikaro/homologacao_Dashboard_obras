import type { Endereco } from './endereco'

export interface Pessoa {
  id: string
  tipo_Cadastro: number
  cpF_CNPJ: string
  nome_Razao_Social: string
  apelido_Fantasia: string
  sexo?: string
  Endereco: Endereco[]
  Contato_Email: ContatoEmail[]
  Contato_Fone: ContatoFone[]
  Cargo?: {
    id: string
    descricao: string
  }
}

export interface ContatoEmail {
  id: string
  email: string
  contato: string
  nFeSN: boolean
  nfSeSN: boolean
  cTeSN: boolean
}

export interface ContatoFone {
  id: string
  fone: string
  ramal: number
  whatsAppSN: boolean
  contato: string
}
