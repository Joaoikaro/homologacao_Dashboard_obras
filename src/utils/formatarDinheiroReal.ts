function formatarDinheiroReal(valor: number): string {
  const sinal = valor < 0 ? '-' : ''
  const valorAbsoluto = Math.abs(valor)

  const formatado = valorAbsoluto.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return sinal + formatado
}

export default formatarDinheiroReal
