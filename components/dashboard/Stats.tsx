"use client";

import { useEffect, useState } from "react";
import { Database, ChartPie, Goal, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

export function DashboardStats() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  // Estados
  const [totalAnalises, setTotalAnalises] = useState(0);
  const [precisaoMedia, setPrecisaoMedia] = useState(0);
  const [percentPositivo, setPercentPositivo] = useState(0);

  useEffect(() => {
    async function fetchStats() {
      if (!session?.accessToken) return;

      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8090";
        const headers = {
            "Authorization": `Bearer ${session.accessToken}`,
            "Content-Type": "application/json"
        };

        // Adicionei timestamp para evitar cache
        const t = new Date().getTime();

        const [resTotal, resHumor, resPrecisao] = await Promise.all([
            fetch(`${baseUrl}/sentiment/total-analises?t=${t}`, { headers }),
            fetch(`${baseUrl}/sentiment/percentual?t=${t}`, { headers }),
            fetch(`${baseUrl}/sentiment/precisao?t=${t}`, { headers })
        ]);

        // 1. TOTAL
        if (resTotal.ok) {
            const data = await resTotal.json();
            // Pega o primeiro valor (totalAnalises: 135)
            const valor = data ? Object.values(data)[0] as number : 0;
            setTotalAnalises(valor);
        }

        // 2. HUMOR (Correção das Chaves)
        if (resHumor.ok) {
            const data = await resHumor.json();
            
            // O Java manda: { "positivos": 60, "negativos": 40 }
            // O Javascript lê com segurança:
            const pos = Number(data.positivos ?? data.Positivo ?? 0);
            const neg = Number(data.negativos ?? data.Negativo ?? 0);
            
            const soma = pos + neg;

            if (soma === 0) {
                setPercentPositivo(0);
            } else {
                // Se o Java manda porcentagem (60+40=100) -> (60/100)*100 = 60%
                // Se o Java manda contagem (6+4=10) -> (6/10)*100 = 60%
                // Funciona para os dois casos!
                const calculo = Math.round((pos / soma) * 100);
                setPercentPositivo(calculo);
            }
        }

        // 3. PRECISÃO (Correção do 6000%)
        if (resPrecisao.ok) {
            const data = await resPrecisao.json();
            // O Java já manda multiplicado por 100 (ex: 98.50)
            // Então aqui nós SÓ ARREDONDAMOS. Não multiplica de novo!
            const val = data.precisao || 0;
            setPrecisaoMedia(Math.round(val)); 
        }

      } catch (error) {
        console.error("Erro estatísticas:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [session]);

  // --- CÁLCULO DO SVG ---
  const CIRCUMFERENCE = 314;
  const strokeDasharray = `${(percentPositivo / 100) * CIRCUMFERENCE} ${CIRCUMFERENCE}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

      {/* CARD 1: Total */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/50 rounded-2xl p-6 relative overflow-hidden group">
        <div className="flex items-center justify-between mb-4 relative z-10 gap-2">
          <h3 className="text-white text-md font-poppins font-bold uppercase tracking-wide">Total de Análises</h3>
          <div className="p-2 bg-blue-default rounded-lg">
            <Database className="w-5 h-5 text-white" />
          </div>
        </div>
        {loading ? <Loader2 className="w-8 h-8 text-white/50 animate-spin" /> : 
            <p className="text-5xl font-bold text-white animate-in slide-in-from-bottom-2">{totalAnalises}</p>
        }
      </div>

      {/* CARD 2: Gráfico */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/50 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-4 relative z-10 gap-2">
          <h3 className="text-white text-md font-poppins font-bold uppercase tracking-wide">Saldo de Humor</h3>
          <div className="p-2 bg-blue-default rounded-lg">
            <ChartPie className="w-5 h-5 text-white" />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              {/* Fundo Vermelho (Negativo/Total) */}
              <circle cx="60" cy="60" r="50" fill="none" stroke="#B91C1C" strokeWidth="12" opacity="0.5" />
              
              {/* Frente Verde (Positivo) */}
              {!loading && (
                  <circle
                    cx="60" cy="60" r="50" fill="none" stroke="#10B981" strokeWidth="12"
                    strokeDasharray={strokeDasharray} strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
              )}
            </svg>

<div className="absolute inset-0 flex flex-col items-center justify-center">
               {loading ? <Loader2 className="w-6 h-6 text-white/50 animate-spin" /> : (() => {
                  
                  // --- LÓGICA DE EXIBIÇÃO DINÂMICA ---
                  const isPositivoDominante = percentPositivo >= 50;
                  const valorExibido = isPositivoDominante ? percentPositivo : (100 - percentPositivo);
                  const textoExibido = isPositivoDominante ? "Positivo" : "Negativo";
                  const corTexto = isPositivoDominante ? "text-[#10B981]" : "text-[#B91C1C]";

                  return (
                    <>
                      <span className={`text-2xl font-inter font-bold text-white`}>
                        {valorExibido}%
                      </span>
                      <span className={`text-[10px] font-inter font-bold uppercase tracking-wider ${corTexto}`}>
                        {textoExibido}
                      </span>
                    </>
                  );
               })()}
            </div>
          </div>
        </div>
      </div>

      {/* CARD 3: Precisão */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/50 rounded-2xl p-6 relative overflow-hidden group">
        <div className="flex items-center justify-between mb-4 relative z-10 gap-2">
          <h3 className="text-white text-md font-poppins font-bold uppercase tracking-wide">Precisão Média</h3>
          <div className="p-2 bg-blue-default rounded-lg shrink-0">
            <Goal className="w-5 h-5 text-white" />
          </div>
        </div>
        {loading ? <Loader2 className="w-8 h-8 text-white/50 animate-spin" /> : (
            <div className="flex flex-col xl:flex-row items-start xl:items-end gap-2 animate-in slide-in-from-bottom-2">
                <p className="text-5xl font-bold text-white">{precisaoMedia}%</p>
                <span className="text-sm font-semibold text-neon-green mb-1 xl:mb-2 whitespace-nowrap">de assertividade</span>
            </div>
        )}
      </div>
    </div>
  )
}