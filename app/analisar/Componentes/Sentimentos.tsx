
import { ResultadoIA } from "../types";

type SentimentosProps = {
  resultado: ResultadoIA | null;
  loading: boolean;
};


export default function Sentimentos({ resultado, loading }: SentimentosProps) {
  if (loading) {
    return <p className="text-center text-white mt-10">Analisando...</p>;
  }

  if (!resultado?.resultados?.length) {
    return <p className="text-center text-white mt-10">Nenhuma análise ainda.</p>;
  }

  return (
    <section className="flex flex-col items-center gap-6 p-6">
      {resultado.resultados.map((item, index) => {
        const confiancaPct = Math.round(item.confianca * 100);

        return (
          <div key={index}>
            {item.sentimento === "positivo" && (
              /* CARD POSITIVO */
              <div className="flex flex-col justify-between w-full md:w-[520px] md:h-[300px] bg-[#0A2A24] border border-white rounded-[24px] p-6 shadow-lg">
                <div className="flex items-center justify-center gap-3">
                  <div className="border-2 border-[#10B981] rounded-full p-1">
                    <span className="text-[#10B981] text-3xl">😊</span>
                  </div>
                  <h2 className="text-[#10B981] text-5xl font-extrabold tracking-wide">
                    POSITIVO
                  </h2>
                </div>

                <div>
                  <div className="flex flex-row items-center justify-between">
                    <p className="text-white text-lg">Confiança da IA:</p>
                    <p className="text-white font-extrabold text-2xl">
                      {confiancaPct}%
                    </p>
                  </div>

                  <div className="w-full bg-transparent h-[10px] rounded-full mt-3 border border-white overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-[#10B981] rounded-full"
                      style={{ width: `${confiancaPct}%` }}
                    />
                  </div>
                </div>

                <div className="w-full h-[1.5px] bg-white my-2"></div>

                <p className="text-white flex items-center gap-2 text-lg font-medium">
                  <span>▸</span> Probabilidade:{" "}
                  <span className="text-[#10B981] font-bold">Alta</span>
                </p>
              </div>
            )}

            {item.sentimento === "negativo" && (
              /* CARD NEGATIVO */
              <div className="flex flex-col justify-between w-full md:w-[520px] md:h-[300px] bg-[#2A0E14] border-2 border-white rounded-[24px] p-6 shadow-lg">
                <div className="flex items-center justify-center gap-3">
                  <div className="border-2 border-[#EF4444] rounded-full p-1">
                    <span className="text-[#EF4444] text-3xl">😠</span>
                  </div>
                  <h2 className="text-[#EF4444] text-5xl font-extrabold tracking-wide">
                    NEGATIVO
                  </h2>
                </div>

                <div>
                  <div className="flex flex-row items-center justify-between">
                    <p className="text-white text-lg">Confiança da IA:</p>
                    <p className="text-white font-extrabold text-2xl">
                      {confiancaPct}%
                    </p>
                  </div>

                  <div className="w-full bg-transparent h-[10px] rounded-full mt-3 border border-white overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-[#EF4444] rounded-full"
                      style={{ width: `${confiancaPct}%` }}
                    />
                  </div>
                </div>

                <div className="w-full h-[1.5px] bg-white my-2"></div>

                <p className="text-white flex items-center gap-2 text-lg font-medium">
                  <span>▸</span> Probabilidade:{" "}
                  <span className="text-[#EF4444] font-bold">Baixa</span>
                </p>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
