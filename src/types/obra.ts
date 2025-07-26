export interface ObraListar {
  id: string,
  descricao: string,
  perc_Executado: number,
  perc_Meta: number,
  val_Orcamento: number,
  val_Gasto: number,
  perc_Gasto: number,
  perc_Desempenho: number,
  status: string
}

export interface ObraCronogramalistar {
  id_Obra: string,
  desc_Obra: string,
  id: string,
  descricao: string,
  numero: number,
  perc_Executado: number,
  perc_Meta: number,
  status: string
}

export interface ObraCronogramalistarFilters {
  id_obra: string
}

export interface ObraCronogramaItemListar {
  id_Obra_Cronograma_Pai: string,
  desc_Obra_Cronograma_Pai: string,
  id: string,
  descricao: string,
  numero: number,
  perc_Executado: number,
  perc_Meta: number,
  data_Previsao_Inicio: string,
  data_Previsao_Termino: string,
  dia_Previsao: number,
  responsavel: string,
  observacao: string,
  status_Dia: string,
  status: string,
  execucao: [
    {
      id: string,
      data: string,
      perc_Executado: number,
      perc_Acumulado: number,
      usuario: string
    }
  ]
}


export interface ObraCronogramaItemlistarFilters {
  id_cronograma_pai: string
}
