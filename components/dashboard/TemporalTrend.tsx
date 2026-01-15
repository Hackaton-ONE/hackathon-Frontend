"use client"

import { useState, useEffect } from "react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { useSession } from "next-auth/react"
import { Loader2, TrendingUp } from "lucide-react" // <--- Importe o TrendingUp

// Tipagem do que vem do Java
interface TrendBackend {
  dia: string;
  diaPt: string;
  positivos: number;
  negativos: number;
}

// Tipagem para o Recharts
interface ChartData {
  day: string;
  positive: number;
  negative: number;
}

export function TemporalTrend() {
  const { data: session } = useSession();
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    async function fetchTrend() {
      if (!session?.accessToken) return;

      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8090";
        const t = new Date().getTime();

        const res = await fetch(`${baseUrl}/sentiment/tendencia-temporal?t=${t}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${session.accessToken}`,
            "Content-Type": "application/json"
          }
        });

        if (!res.ok) throw new Error("Erro ao buscar tendência");

        const backendData: TrendBackend[] = await res.json();

        const formattedData: ChartData[] = backendData.map(item => {
          let label = item.diaPt || item.dia;
          if (label.includes("-")) label = label.split("-")[0];
          label = label.charAt(0).toUpperCase() + label.slice(1);

          return {
            day: label,
            positive: item.positivos,
            negative: item.negativos
          };
        });

        setData(formattedData);

      } catch (error) {
        console.error("Falha na tendência:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTrend();
  }, [session]);

  const formatXAxis = (tickItem: string) => {
    if (isMobile) return tickItem.substring(0, 3);
    return tickItem;
  }

  // --- LÓGICA DE VERIFICAÇÃO DE DADOS ---
  // Verifica se existe ALGUM número maior que 0 em toda a semana
  const hasData = data.some(item => item.positive > 0 || item.negative > 0);

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/50 rounded-2xl p-6 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mr-9 xl:mr-10">
        <h3 className="text-white font-poppins font-bold text-md uppercase tracking-wide">
            Tendência Temporal
        </h3>
        
        {/* Só mostra a legenda se tiver dados */}
        {hasData && (
            <div className="flex gap-4 text-xs font-inter bg-white/5 p-2 rounded-lg border border-white/10 w-fit">
                <div className="flex items-center gap-1 text-white/90">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span> Positivo
                </div>
                <div className="flex items-center gap-1 text-white/90">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B91C1C] shadow-[0_0_8px_rgba(185,28,28,0.5)]"></span> Negativo
                </div>
            </div>
        )}
      </div>

      <div className="flex-1 w-full min-h-[300px]">
        {loading ? (
            <div className="h-full w-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white/50 animate-spin" />
            </div>
        ) : !hasData ? (
            // --- ESTADO VAZIO (EMPTY STATE) ---
            <div className="h-full w-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-500">
                <div className="bg-white/5 p-4 rounded-full mb-3 border border-neon-orange">
                    <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <p className="text-neon-orange font-medium text-sm">Sem dados esta semana</p>
                <p className="text-white text-xs mt-2 max-w-[200px]">
                    Realize novas análises para ver a curva de tendência se formar.
                </p>
            </div>
        ) : (
            // --- GRÁFICO (Só renderiza se tiver dados > 0) ---
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                data={data}
                margin={{ top: 5, right: 40, left: 0, bottom: 5 }}
                >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(96,165,250,0.5)" />

                <XAxis
                    dataKey="day"
                    stroke="rgba(96,165,250,100)"
                    style={{ fontSize: "12px", fontFamily: "Inter" }}
                    tickFormatter={formatXAxis}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                    interval="preserveStartEnd"
                />

                <YAxis 
                    stroke="rgba(96,165,250,100)" 
                    style={{ fontSize: "12px", fontFamily: "Inter" }} 
                    tickLine={false}
                    axisLine={false}
                />

                <Tooltip
                    contentStyle={{
                        backgroundColor: "#0F172A",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "12px",
                        color: "white",
                        fontFamily: "Inter",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.5)"
                    }}
                    itemStyle={{ padding: 0 }}
                    cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2 }}
                />

                <Line 
                    type="monotone" 
                    dataKey="positive" 
                    stroke="#10B981" 
                    strokeWidth={3} 
                    dot={{ fill: "#0F172A", stroke: "#10B981", strokeWidth: 2, r: 4 }} 
                    activeDot={{ r: 6, fill: "#10B981" }}
                    animationDuration={1500}
                />

                <Line 
                    type="monotone" 
                    dataKey="negative" 
                    stroke="#B91C1C" 
                    strokeWidth={3} 
                    dot={{ fill: "#0F172A", stroke: "#B91C1C", strokeWidth: 2, r: 4 }} 
                    activeDot={{ r: 6, fill: "#B91C1C" }}
                    animationDuration={1500}
                />
                </LineChart>
            </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}