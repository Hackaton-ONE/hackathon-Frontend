"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

// 1. Tipagem do Backend
interface PalavraDTO {
  palavra: string;
  positivos: number;
  negativos: number;
}

// 2. Tipagem Visual
interface KeywordItem {
  word: string;
  count: number;     // Total de vezes que apareceu
  percent: number;   // Largura da barra (0 a 100)
  color: string;     // Verde ou Vermelho
}

export function TopKeywords() {
  const { data: session } = useSession();
  const [keywords, setKeywords] = useState<KeywordItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchKeywords() {
      if (!session?.accessToken) return;

      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8090";
        
        // Adiciona timestamp para evitar cache
        const t = new Date().getTime();
        
        const res = await fetch(`${baseUrl}/sentiment/palavras-mais-usadas?t=${t}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${session.accessToken}`,
            "Content-Type": "application/json"
          }
        });

        if (!res.ok) throw new Error("Erro ao buscar palavras");

        const data: PalavraDTO[] = await res.json();

        // --- LÓGICA DE TRANSFORMAÇÃO ---
        
        // 1. Descobrir qual é a contagem máxima para usar como base (100%)
        // Somamos positivos + negativos para saber o total de menções de cada palavra
        const maxCount = Math.max(...data.map(d => d.positivos + d.negativos), 1); // evita divisão por 0

        const formattedData: KeywordItem[] = data.map((item) => {
            const total = item.positivos + item.negativos;
            
            // Define a cor predominante
            const isPositive = item.positivos >= item.negativos;
            
            return {
                word: item.palavra,
                count: total,
                // Calcula a largura relativa ao item mais frequente
                percent: Math.round((total / maxCount) * 100),
                color: isPositive ? "bg-[#10B981]" : "bg-[#B91C1C]"
            };
        });

        setKeywords(formattedData);

      } catch (error) {
        console.error("Falha ao carregar top palavras:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchKeywords();
  }, [session]);

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/50 rounded-2xl p-6 h-full flex flex-col">
      <h3 className="text-white font-poppins font-bold text-md mb-6 uppercase tracking-wide">
        Top Palavras-Chave
      </h3>

      {loading ? (
        <div className="flex flex-1 items-center justify-center">
            <Loader2 className="w-8 h-8 text-white/50 animate-spin" />
        </div>
      ) : keywords.length > 0 ? (
          <div className="space-y-5 overflow-y-auto pr-2 custom-scrollbar">
            {keywords.map((keyword, index) => (
              <div key={index} className="group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm capitalize font-medium">
                    {keyword.word}
                  </span>
                  <span className="text-xs text-white/80">
                    {keyword.count} menções
                  </span>
                </div>

                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div
                    className={`${keyword.color} h-full rounded-full transition-all duration-1000 ease-out group-hover:brightness-110`}
                    style={{ width: `${keyword.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
      ) : (
          <div className="flex flex-1 items-center justify-center text-center">
             <p className="text-neon-orange text-sm">
                Nenhuma palavra relevante encontrada ainda.
             </p>
          </div>
      )}
    </div>
  )
}