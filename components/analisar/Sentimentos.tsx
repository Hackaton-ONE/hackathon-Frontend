import { ResultadoSentimento } from "@/types/sentiment"; 
import { Smile, Frown } from "lucide-react";

type SentimentosProps = {
  resultado: ResultadoSentimento | null;
  loading: boolean;
};

export default function Sentimentos({ resultado, loading }: SentimentosProps) {

  // --- LÓGICA DE ESTADO ---

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-10 mb-10">
        <div className="animate-pulse flex flex-col items-center gap-4">
          {/* Spinner Customizado */}
          <div className="w-12 h-12 border-4 border-blue-default border-t-transparent rounded-full animate-spin" />
          <p className="text-center text-white text-lg font-inter">Consultando a IA...</p>
        </div>
      </div>
    )
  }

  // Se não tem resultado, mostra mensagem vazia
  if (!resultado) {
    return (
        <div className="flex flex-col items-center justify-center mt-10">
            <p className="text-center text-white/80 text-sm font-inter">
                Os resultados da análise aparecerão aqui.
            </p>
        </div>
    );
  }

  // --- CÁLCULOS (CORRIGIDO AQUI) ---
  // Agora usamos 'resultado' em vez de 'itemExibido'
  const probabilidadeRaw = Math.round(resultado.probabilidade * 100);
  
  const probabilidadePct = resultado.sentimento === "Positivo" 
  ? 100 - probabilidadeRaw 
  : probabilidadeRaw;
  
  const nivelConfianca = probabilidadePct > 60 ? "Alta" : "Baixa";

  return (
    <section className="flex flex-col items-center self-center gap-6 p-6 w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* CARD POSITIVO */}
            {resultado.sentimento === "Positivo" && (
              <div className="
                  group relative flex flex-col gap-6 
                  w-full md:w-[520px] 
                  bg-neon-green/25 
                  border border-white/40
                  rounded-[32px] 
                  p-8 
                  shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)]
                  transition-all hover:scale-[1.02]
              ">
                {/* Glow interno verde */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-neon-green/20 blur-[60px] rounded-full pointer-events-none" />

                <div className="flex items-center self-center gap-4 z-10">
                    <Smile className="text-neon-green w-16 h-16" strokeWidth={2.5} />
                  
                  <h2 className="text-neon-green text-5xl font-black tracking-wide drop-shadow-md">
                    POSITIVO
                  </h2>
                </div>

                <div className="flex flex-col gap-2 z-10">
                  <div className="flex justify-between items-end">
                    <p className="text-white text-sm uppercase font-poppins font-regular">Confiança da IA</p>
                    <p className="text-white font-bold text-3xl">
                      {probabilidadePct}<span className="text-2xl text-white">%</span>
                    </p>
                  </div>

                  {/* Barra de Progresso */}
                  <div className="w-full h-3 bg-green-900/40 rounded-full overflow-hidden border border-white/5">
                    <div
                      className="h-full bg-gradient-to-r from-blue-default to-neon-green shadow-[0_0_15px_rgba(74,222,128,0.5)]"
                      style={{ width: `${probabilidadePct}%` }}
                    />
                  </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                
                <div className="flex justify-between items-center">
                    <span className="text-white text-sm font-medium">Análise concluída</span>
                    <p className="text-neon-green text-sm font-poppins font-semibold tracking-wide bg-white/20 px-3 py-1 rounded-full border border-white/10">
                    <span className="text-white font-medium">Probabilidade:</span> {nivelConfianca}
                    </p>
                </div>
              </div>
            )}

            {/* CARD NEGATIVO */}
            {resultado.sentimento === "Negativo" && (
              <div className="
                  group relative flex flex-col gap-6 
                  w-full md:w-[520px] 
                  bg-neon-red/25
                  border border-white/40 
                  rounded-[32px] 
                  p-8 
                  shadow-[0_0_40px_-10px_rgba(185,28,28,0.5)]
                  transition-all hover:scale-[1.02]
              ">

                {/* Glow interno vermelho */}
                 <div className="absolute top-0 right-0 w-32 h-32 bg-neon-red/20 blur-[60px] rounded-full pointer-events-none" />

                <div className="flex items-center self-center gap-4 z-10">
                    <Frown className="text-neon-red w-16 h-16" strokeWidth={2.5} />
                  
                  <h2 className="text-neon-red text-5xl font-black tracking-wide drop-shadow-md">
                    NEGATIVO
                  </h2>
                </div>

                <div className="flex flex-col gap-2 z-10">
                  <div className="flex justify-between items-end">
                    <p className="text-white text-sm uppercase font-poppins">Confiança da IA</p>
                    <p className="text-white font-poppins font-bold text-3xl">
                      {probabilidadePct}<span className="text-2xl text-white">%</span>
                    </p>
                  </div>

                  <div className="w-full h-3 bg-red-900/40 rounded-full overflow-hidden border border-white/5">
                    <div
                      className="h-full bg-gradient-to-r from-neon-orange to-neon-red shadow-[0_0_15px_rgba(248,113,113,0.5)]"
                      style={{ width: `${probabilidadePct}%` }}
                    />
                  </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                <div className="flex justify-between items-center">
                    <span className="text-white text-sm font-medium">Análise concluída</span>
                    <p className="text-neon-orange text-sm font-poppins font-semibold tracking-wide bg-white/20 px-3 py-1 rounded-full border border-white/10">
                    <span className="text-white font-medium">Probabilidade:</span> {nivelConfianca}
                    </p>
                </div>
              </div>
            )}
    </section>
  );
}