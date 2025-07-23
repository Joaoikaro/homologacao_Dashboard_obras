export interface ClientesGeral {
  IdCliente: number,
  StatusCliente: string,
  Tipo: string,
  Cliente: string,
  Email: string,
  Senha: string,
  Modulo: string,
  MaxBackupSN: number,
}

export interface AtualizarEmail {
  Id: number,
  Email: string,
}
