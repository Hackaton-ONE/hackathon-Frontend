export type ResultadoSentimento = {
  id: number;
  texto: string;
  sentimento: "Positivo" | "Negativo";
  probabilidade: number;
  usuario: string;
  data: string;
};

