export interface Endereco {
  id: string
  logradouro: string
  numero: string
  bairro: string
  cep: string
  cidade: string
  uf: string
  pais: string
  complemento?: string
  ponto_Referencia?: string
}
