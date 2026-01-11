export type ResultadoSentimento = {
  sentimento: "positivo" | "negativo";
  confianca: number;
};

export type ResultadoIA = {
  resultados: ResultadoSentimento[];
};