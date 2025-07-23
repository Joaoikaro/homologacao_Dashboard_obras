const abreviarMes = (mes: string): string => {
  const mesesAbreviados: { [key: string]: string } = {
    '01': 'Jan',
    '02': 'Fev',
    '03': 'Mar',
    '04': 'Abr',
    '05': 'Mai',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Ago',
    '09': 'Set',
    '10': 'Out',
    '11': 'Nov',
    '12': 'Dez',
    'janeiro': 'Jan',
    'fevereiro': 'Fev',
    'março': 'Mar',
    'abril': 'Abr',
    'maio': 'Mai',
    'junho': 'Jun',
    'julho': 'Jul',
    'agosto': 'Ago',
    'setembro': 'Set',
    'outubro': 'Out',
    'novembro': 'Nov',
    'dezembro': 'Dez',
  };

  return mesesAbreviados[mes] || mes;
}

export default abreviarMes;
