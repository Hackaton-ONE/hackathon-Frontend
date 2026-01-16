"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Button from "../Button";
import GlassCard from "../GlassCard";
import { ArrowRight } from "lucide-react";

export default function InputSentimento() {
  const { data: session } = useSession();
  const [texto, setTexto] = useState("");
  const [loading, setLoading] = useState(false);
  const [usarTradutor, setUsarTradutor] = useState(false);

  const handleAnalise = async () => {
    if (!texto) return alert("Digite um texto!");
    
    // Verificação de segurança da sessão
    if (!session || !(session as any).accessToken) {
        return alert("Sessão expirada. Faça login novamente.");
    }

    setLoading(true);
    try {
      // Define o endpoint: Se marcou tradutor, usa /tradutor, senão usa o padrão
      const endpoint = usarTradutor ? "/sentiment/tradutor" : "/sentiment";
      
      const res = await fetch(`http://localhost:8080${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Envia o token no padrão Bearer
          "Authorization": `Bearer ${(session as any).accessToken}`
        },
        body: JSON.stringify({ texto }),
      });

      if (res.status === 403 || res.status === 401) {
        alert("Sessão inválida. Por favor, faça login novamente.");
        return;
      }

      const data = await res.json();
      
      // Exibe o resultado num alerta simples (como era antes)
      alert(`Sentimento: ${data.sentimento}\nProbabilidade: ${(data.probabilidade * 100).toFixed(2)}%`);
      
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <GlassCard className="p-6">
        <h2 className="text-xl font-bold mb-4 text-white">Análise de Sentimento</h2>
        
        <div className="flex items-center gap-2 mb-4">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-300 hover:text-white">
                <input 
                    type="checkbox" 
                    checked={usarTradutor} 
                    onChange={(e) => setUsarTradutor(e.target.checked)}
                    className="w-4 h-4 rounded bg-white/10 border-white/20"
                />
                Ativar Tradutor Automático (Google Gemini)
            </label>
        </div>

        <textarea
          className="w-full h-32 bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none transition-all"
          placeholder="Digite seu comentário aqui..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        
        <div className="flex justify-end mt-4">
          <Button 
            onClick={handleAnalise} 
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading ? "Analisando..." : "Analisar"} 
            {!loading && <ArrowRight className="w-4 h-4" />}
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}
