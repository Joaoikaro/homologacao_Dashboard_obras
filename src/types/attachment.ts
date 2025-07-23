export interface Attachment {
  url: string
  principalSN: boolean
  id: string
}

export interface CreateAttachment {
  id: string | null
  descricao: string
  base64: string
  principalSN: boolean
  idTabela?: string
}
