"use client";

import { useState } from "react";
import { useSession } from "next-auth/react"; // Importante para pegar o token
import Button from "../Button";
import GlassCard from "../GlassCard";
import { ArrowRight, Upload, Download, FileText, CheckCircle } from "lucide-react";

export default function InputSentimento() {
  const { data: session } = useSession(); // Pega a sessão (e o token)
  const [texto, setTexto] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Opções de configuração
  const [usarTradutor, setUsarTradutor] = useState(false);
  const [idioma, setIdioma] = useState("pt"); // "pt" ou "es"
  
  // Estado do Arquivo
  const [arquivo, setArquivo] = useState<File | null>(null);

  // --- Lógica de Envio de TEXTO ÚNICO ---
  const handleAnaliseTexto = async () => {
    if (!texto) return alert("Digite um texto!");
    if (!session || !(session as any).accessToken) return alert("Sessão expirada. Faça login novamente.");

    setLoading(true);
    try {
      // Define a URL baseada na escolha do tradutor
      const endpoint = usarTradutor ? "/sentiment/tradutor" : "/sentiment";
      
      const res = await fetch(`http://localhost:8080${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // INJETA O TOKEN CORRETAMENTE AQUI
          "Authorization": `Bearer ${(session as any).accessToken}`
        },
        body: JSON.stringify({ 
            texto: texto,
            // Nota: Se o backend Java não suportar "lang" no DTO ainda, isso será ignorado, 
            // mas já estamos enviando conforme solicitado.
            lang: idioma 
        }),
      });

      if (res.status === 403 || res.status === 401) {
        alert("Sessão inválida. Por favor, faça login novamente.");
        return;
      }

      const data = await res.json();
      alert(`Sentimento: ${data.sentimento}\nProbabilidade: ${(data.probabilidade * 100).toFixed(2)}%`);
      
    } catch (error) {
      console.error(error);
      alert("Erro ao analisar.");
    } finally {
      setLoading(false);
    }
  };

  // --- Lógica de Upload de ARQUIVO (CSV/JSON) ---
  const handleUploadArquivo = async () => {
    if (!arquivo) return alert("Selecione um arquivo primeiro!");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", arquivo);

    try {
      let endpoint = "";
      let isCsv = arquivo.name.toLowerCase().endsWith(".csv");

      if (isCsv) {
        endpoint = "http://localhost:8080/sentiment/upload-csv";
      } else {
        // Assume JSON Batch
        // Nota: Para JSON batch, idealmente leríamos o arquivo e mandaríamos como JSON body, 
        // mas se implementamos upload no Java, usamos multipart.
        // Se o Java espera JSON body no /batch-check, precisamos ler o arquivo:
         const text = await arquivo.text();
         const jsonBody = JSON.parse(text); // Espera { "texts": [...] }
         
         const resBatch = await fetch("http://localhost:8080/sentiment/batch-check", {
             method: "POST",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify(jsonBody)
         });
         const dataBatch = await resBatch.json();
         // Baixar JSON de resposta
         downloadBlob(new Blob([JSON.stringify(dataBatch, null, 2)]), "resultado_batch.json");
         setLoading(false);
         return;
      }

      // Lógica para CSV (Streaming de Download)
      const res = await fetch(endpoint, {
        method: "POST",
        // Não coloque Content-Type no header quando usar FormData, o navegador coloca automaticamente
        body: formData,
      });

      if (!res.ok) throw new Error("Erro no upload");

      // Transforma a resposta (bytes) em um arquivo para baixar
      const blob = await res.blob();
      downloadBlob(blob, `resultado_${arquivo.name}`);

    } catch (error) {
      console.error(error);
      alert("Erro ao processar arquivo.");
    } finally {
      setLoading(false);
    }
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      
      {/* --- SEÇÃO 1: Análise de Texto Rápida --- */}
      <GlassCard className="p-6">
        <h2 className="text-xl font-bold mb-4 text-white">Análise Rápida</h2>
        
        {/* Controles de Idioma e Tradutor */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-300">
            <label className="flex items-center gap-2 cursor-pointer">
                <input 
                    type="checkbox" 
                    checked={usarTradutor} 
                    onChange={(e) => setUsarTradutor(e.target.checked)}
                    className="w-4 h-4 rounded bg-white/10 border-white/20"
                />
                Usar Tradutor (Google Gemini)
            </label>

            <div className="flex items-center gap-2 ml-auto">
                <span className="text-gray-400">Idioma do Modelo:</span>
                <button 
                    onClick={() => setIdioma("pt")}
                    className={`px-3 py-1 rounded transition ${idioma === "pt" ? "bg-purple-600 text-white" : "bg-white/5"}`}
                >
                    Português 🇧🇷
                </button>
                <button 
                    onClick={() => setIdioma("es")}
                    className={`px-3 py-1 rounded transition ${idioma === "es" ? "bg-purple-600 text-white" : "bg-white/5"}`}
                >
                    Espanhol 🇪🇸
                </button>
            </div>
        </div>

        <textarea
          className="w-full h-32 bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none transition-all"
          placeholder="Digite ou cole o comentário aqui..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        
        <div className="flex justify-end mt-4">
          <Button 
            onClick={handleAnaliseTexto} 
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading ? "Analisando..." : "Analisar Agora"} 
            {!loading && <ArrowRight className="w-4 h-4" />}
          </Button>
        </div>
      </GlassCard>

      {/* --- SEÇÃO 2: Processamento em Lote (Upload) --- */}
      <GlassCard className="p-6 border-t-4 border-t-green-500">
        <h2 className="text-xl font-bold mb-2 text-white flex items-center gap-2">
            <Upload className="w-5 h-5 text-green-400" /> 
            Processamento em Lote (CSV / JSON)
        </h2>
        <p className="text-sm text-gray-400 mb-4">
            Envie arquivos grandes. Nós processamos e devolvemos o resultado pronto para download.
        </p>

        <div className="border-2 border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors">
            {!arquivo ? (
                <>
                    <FileText className="w-10 h-10 text-gray-500 mb-2" />
                    <label className="cursor-pointer">
                        <span className="bg-white/10 px-4 py-2 rounded text-sm text-white hover:bg-white/20 transition">
                            Selecionar Arquivo
                        </span>
                        <input 
                            type="file" 
                            className="hidden" 
                            accept=".csv, .json"
                            onChange={(e) => setArquivo(e.target.files?.[0] || null)}
                        />
                    </label>
                    <p className="text-xs text-gray-500 mt-2">Suporta .csv ou .json</p>
                </>
            ) : (
                <div className="flex flex-col items-center">
                    <CheckCircle className="w-10 h-10 text-green-500 mb-2" />
                    <p className="text-white font-medium">{arquivo.name}</p>
                    <p className="text-xs text-gray-400 mt-1">{(arquivo.size / 1024).toFixed(1)} KB</p>
                    
                    <div className="flex gap-2 mt-4">
                        <Button onClick={handleUploadArquivo} disabled={loading} className="bg-green-600 hover:bg-green-700">
                            {loading ? "Processando..." : "Enviar e Baixar Resultado"}
                            {!loading && <Download className="w-4 h-4 ml-2" />}
                        </Button>
                        <button 
                            onClick={() => setArquivo(null)}
                            className="text-xs text-red-400 hover:text-red-300 underline"
                        >
                            Remover
                        </button>
                    </div>
                </div>
            )}
        </div>
      </GlassCard>

    </div>
  );
}
