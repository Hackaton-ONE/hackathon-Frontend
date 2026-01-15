
import { ResultadoSentimento } from "../types";

type SentimentosProps = {
  resultado: ResultadoSentimento | null;
  loading: boolean;
};


export default function Sentimentos({ resultado, loading }: SentimentosProps) {

  console.log(resultado)

  if (loading) {
    return <p className="text-center text-white mt-10 mb-10">Analisando...</p>;
  }

  if (!resultado) {
    return <p className="text-center text-white mt-10 mb-10">Nenhuma análise ainda.</p>;
  }

  const probabilidadePct = Math.round(resultado.probabilidade * 100);
  return (
    <section className="flex flex-col items-center gap-6 p-6">
            {resultado.sentimento === "Positivo" && (
              /* CARD POSITIVO */
              <div className="flex flex-col gap-7 w-full md:w-[520px] md:h-[200px] bg-[#0A2A24] border border-white rounded-[24px] p-6 shadow-lg">
                <div className="flex items-center justify-center gap-3">
                  <div className="border-2 border-[#10B981] rounded-full p-1">
                    <span className="text-[#10B981] text-3xl">😊</span>
                  </div>
                  <h2 className="text-[#10B981] text-5xl font-extrabold tracking-wide">
                    POSITIVO
                  </h2>
                </div>

                <div>
                  <div className="flex justify-between">
                    <p className="text-white text-lg">Confiança da IA:</p>
                    <p className="text-white font-extrabold text-2xl">
                      {probabilidadePct}%
                    </p>
                  </div>

                  <div className="w-full h-[10px] mt-3 border border-white rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-[#10B981]"
                      style={{ width: `${probabilidadePct}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {resultado.sentimento === "Negativo" && (
              /* CARD NEGATIVO */
              <div className="flex flex-col gap-7 w-full md:w-[520px] md:h-[200px] bg-[#2A0E14] border border-white rounded-[24px] p-6 shadow-lg">
                <div className="flex items-center justify-center gap-3">
                  <div className="border-2 border-[#EF4444] rounded-full p-1">
                    <span className="text-[#EF4444] text-3xl">😠</span>
                  </div>
                  <h2 className="text-[#EF4444] text-5xl font-extrabold tracking-wide">
                    NEGATIVO
                  </h2>
                </div>

                <div>
                  <div className="flex justify-between">
                    <p className="text-white text-lg">Confiança da IA:</p>
                    <p className="text-white font-extrabold text-2xl">
                      {probabilidadePct}%
                    </p>
                  </div>

                  <div className="w-full h-[10px] mt-3 border border-white rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-[#EF4444]"
                      style={{ width: `${probabilidadePct}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
    </section>
  );
}

