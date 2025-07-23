const formatarNumeroCompacto = (valor: number) => {
  if (valor >= 1_000_000) return `${(valor / 1_000_000).toFixed(1)}M`
  if (valor >= 1_000) return `${(valor / 1_000).toFixed(0)}K`
  
return valor.toString()
}

export default formatarNumeroCompacto;
