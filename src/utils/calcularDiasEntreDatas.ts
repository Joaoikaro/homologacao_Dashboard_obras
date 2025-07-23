function calcularDiasEntreDatas(data1: Date | string, data2: Date | string): number {
  const date1 = new Date(data1);
  const date2 = new Date(data2);
  const diferencaEmMilissegundos = Math.abs(date2.getTime() - date1.getTime());
  const dias = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));

  
return dias;
}

export default calcularDiasEntreDatas;
