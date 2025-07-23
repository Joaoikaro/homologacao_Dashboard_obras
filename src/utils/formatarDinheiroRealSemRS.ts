const formatarDinheiroRealSemRS = (valor: number) => {
  return valor.toLocaleString('pt-BR', {
    minimumFractionDigits: 0,
  });
};

export default formatarDinheiroRealSemRS;
