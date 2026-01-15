export type Comentario = {
  id?: number;
  texto: string;
  sentimento: string;
  probabilidade: number;
  dataComentario?: string;
};

export type Estatisticas = {
  TOTAL?: number;
  POSITIVO?: number;
  NEGATIVO?: number;
};