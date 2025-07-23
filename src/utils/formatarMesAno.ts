function formatarMesAno(valor: string): string {
  // const meses: Record<string, string> = {
  //   janeiro: '01',
  //   fevereiro: '02',
  //   março: '03',
  //   abril: '04',
  //   maio: '05',
  //   junho: '06',
  //   julho: '07',
  //   agosto: '08',
  //   setembro: '09',
  //   outubro: '10',
  //   novembro: '11',
  //   dezembro: '12'
  // }

    const meses: Record<string, string> = {
    janeiro: 'Jan',
    fevereiro: 'Fev',
    março: 'Mar',
    abril: 'Abr',
    maio: 'Mai',
    junho: 'Jun',
    julho: 'Jul',
    agosto: 'Ago',
    setembro: 'Set',
    outubro: 'Out',
    novembro: 'Nov',
    dezembro: 'Dez'
  }

  const [mesTexto, ano] = valor.toLowerCase().split('-')

  const mes = meses[mesTexto] || '??'
  const anoCurto = ano?.slice(-2) || '??'

  return `${mes}/${anoCurto}`
}

export default formatarMesAno
