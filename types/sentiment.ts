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

export type ResultadoSentimento = {
  id: number;
  texto: string;
  sentimento: "Positivo" | "Negativo";
  probabilidade: number;
  
  usuario: {
    id: number;
    usuario: string;
  }
  
  dataComentario: string;
};

