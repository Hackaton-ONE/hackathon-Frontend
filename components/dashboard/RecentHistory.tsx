"use client";

import { useState } from "react";
import { Filter, X, Calendar, CheckCircle2, AlertCircle, MessageSquare } from "lucide-react";

// 1. Tipagem dos dados

interface HistoryItem {
  id: string;
  text: string;
  fullText?: string;
  date: string;
  confidence: string;
  status: "Positivo" | "Negativo";

}



const historyData: HistoryItem[] = [

  {
    id: "#095",
    text: "O sistema é muito rápido e...",
    fullText: "O sistema é muito rápido e responsivo. Gostei bastante da interface nova, mas acho que o botão de login poderia ser maior.",
    date: "20/12",
    confidence: "98%",
    status: "Positivo",

  },

  {
    id: "#094",
    text: "Travou tudo quando tentei...",
    fullText: "Travou tudo quando tentei exportar o relatório em PDF. A tela ficou branca e tive que reiniciar o navegador.",
    date: "20/12",
    confidence: "94%",
    status: "Negativo",

  },

  {
    id: "#093",
    text: "Estou impressionado com a...",
    fullText: "Estou impressionado com a precisão da análise. Bateu exatamente com o feedback que recebemos na loja física.",
    date: "19/12",
    confidence: "98%",
    status: "Positivo",

  },

  {
    id: "#092",
    text: "Péssima experiência. O aplic...",
    fullText: "Péssima experiência. O aplicativo fecha sozinho toda vez que tento abrir a aba de configurações. Preciso de ajuda urgente.",
    date: "18/12",
    confidence: "95%",
    status: "Negativo",
  },

  {

    id: "#091",
    text: "Já abri dois chamados e nin...",
    fullText: "Já abri dois chamados e ninguém me respondeu. O suporte está deixando a desejar, apesar da ferramenta ser boa.",
    date: "28/12",
    confidence: "89%",
    status: "Negativo",

  },

];



export function RecentHistory() {

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedSentiment, setSelectedSentiment] = useState("Todos");
  const [selectedDate, setSelectedDate] = useState("");

  // 2. Usa a Interface para tipar o estado corretamente
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  const filteredData = historyData.filter((item) => {

    const matchSentiment = selectedSentiment === "Todos" || item.status === selectedSentiment;
    const matchDate = !selectedDate || item.date.includes(selectedDate);
    return matchSentiment && matchDate;

  });

  return (

    <>

      <div className="bg-white/5 backdrop-blur-lg border border-white/50 rounded-2xl p-6 transition-all duration-300">

        {/* CABEÇALHO */}
        <div className="flex items-center justify-between mb-6">

          <h3 className="text-white font-poppins font-bold text-md uppercase tracking-wide">
            Histórico Recente
          </h3>

          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`p-2 rounded-lg transition-all duration-200 border ${
              isFilterOpen
                ? "bg-neon-red/20 text-neon-red border-neon-red"

                : "bg-white/5 text-white border-white/10 hover:bg-white/10"
            }`}

          >

            {isFilterOpen ? <X size={20} /> : <Filter size={20} />}

          </button>
        </div>

        {/* FILTROS */}
        {isFilterOpen && (

          <div className="mb-6 p-4 bg-black/20 rounded-xl border border-white/10 animate-in fade-in slide-in-from-top-2">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="space-y-2">

                <label className="text-xs text-white font-poppins uppercase">Sentimento</label>

                <div className="flex gap-2">
                  {["Todos", "Positivo", "Negativo"].map((option) => (

                    <button
                      key={option}
                      onClick={() => setSelectedSentiment(option)}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors border ${
                        selectedSentiment === option

                          ? "bg-white text-mood-dark border-white"

                          : "bg-transparent text-white border-white/20 hover:border-white/50"

                      }`}

                    >

                      {option}

                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">

                <label className="text-xs text-white font-poppins uppercase">Data Específica</label>

                <div className="relative">

                  <input
                    type="text"
                    placeholder="Ex: 20/12"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-md py-1.5 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-neon-green placeholder:text-white/60"

                  />

                  <Calendar className="absolute left-2.5 top-2 text-white w-4 h-4" />

                </div>
              </div>
            </div>
          </div>
        )}



        {/* TABELA (Desktop) */}
        <div className="hidden md:block overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b border-white/40">
                <th className="text-center text-white font-medium text-sm pb-3 pr-4">ID</th>
                <th className="text-center text-white font-medium text-sm pb-3 pr-4">Texto (Snippet)</th>
                <th className="text-center text-white font-medium text-sm pb-3 pr-4">Data</th>
                <th className="text-center text-white font-medium text-sm pb-3 pr-4">Confiança</th>
                <th className="text-center text-white font-medium text-sm pb-3">Status</th>
              </tr>
            </thead>

            <tbody>

              {filteredData.length > 0 ? (

                filteredData.map((item, index) => (

                  <tr

                    key={index}
                    onClick={() => setSelectedItem(item)}
                    className="border-b border-white/40 last:border-0 hover:bg-white/10 transition-colors cursor-pointer group"

                  >

                    <td className="py-4 pr-4 font-inter font-light text-white text-sm text-center opacity-70 group-hover:opacity-100">{item.id}</td>

                    <td className="py-4 pr-4 font-inter font-light text-white text-sm text-center max-w-[200px] truncate">{item.text}</td>

                    <td className="py-4 pr-4 font-inter font-light text-white text-sm text-center">{item.date}</td>

                    <td className="py-4 pr-4 font-inter font-light text-white text-sm text-center">{item.confidence}</td>

                    <td className="py-4 text-center">

                      <span className={`px-3 py-1 rounded-full text-xs font-inter font-medium flex items-center justify-center gap-1 w-fit mx-auto ${
                          item.status === "Positivo"

                            ? "bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30"

                            : "bg-[#B91C1C]/20 text-[#B91C1C] border border-[#B91C1C]/30"

                        }`}

                      >

                        {item.status === "Positivo" ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}

                        {item.status}

                      </span>
                    </td>
                  </tr>
                ))

              ) : (

                <tr>

                  <td colSpan={5} className="py-8 text-center text-neon-orange text-sm">
                    Nenhum resultado encontrado.
                  </td>

                </tr>

              )}
            </tbody>
          </table>
        </div>

        {/* CARDS (Mobile) */}
        <div className="md:hidden space-y-4">

          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (

              <div

                key={index}
                onClick={() => setSelectedItem(item)}
                className="bg-white/10 border border-white/50 rounded-xl p-4 active:scale-95 transition-transform cursor-pointer"

              >

                <div className="flex items-start justify-between mb-2">
                  <span className="text-white font-medium">{item.id}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex gap-1 items-center ${
                      item.status === "Positivo"

                        ? "bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30"

                        : "bg-[#B91C1C]/20 text-[#B91C1C] border border-[#B91C1C]/30"

                    }`}

                  >

                    {item.status === "Positivo" ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}

                    {item.status}

                  </span>
                </div>

                <p className="text-white text-sm mb-2 line-clamp-2">{item.text}</p>

                <div className="flex items-center justify-between text-xs text-white opacity-70">
                  <span>{item.date}</span>
                  <span>Confiança: {item.confidence}</span>
                </div>
              </div>
            ))

          ) : (

            <div className="text-center py-6 text-neon-orange text-sm">
              Nenhum resultado encontrado.
            </div>

          )}
        </div>
      </div>

      {/* === MODAL DE DETALHES === */}
      {selectedItem && (

        <div

            className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setSelectedItem(null)}

        >

          <div

              className="bg-mood-dark/80 border border-white/40 p-6 rounded-2xl max-w-lg w-full shadow-2xl relative animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}

          >

            {/* Cabeçalho do Modal */}
            <div className="flex justify-between items-start mb-6">

                <div>

                    <h4 className="text-white text-lg font-poppins font-bold flex items-center gap-2">
                        Detalhes da Análise <span className="text-sm font-light text-blue-light">({selectedItem.id})</span>

                    </h4>

                    <p className="text-xs text-neon-orange mt-1 flex items-center gap-1">
                        <Calendar size={12} /> {selectedItem.date}
                    </p>

                </div>

                {/* Botão de Fechar */}
                <button
                    onClick={() => setSelectedItem(null)}
                    className="text-neon-red/80 hover:text-neon-red transition-colors"

                >

                    <X size={24} />

                </button>
            </div>

            {/* Status e Confiança */}
            <div className="flex gap-4 mb-6">
                 
                 <div className="flex-1 bg-white/5 rounded-xl p-3 border border-white/10 text-center">
                    
                    <p className="text-xs text-white uppercase mb-1">Status</p>

                    <span className={`inline-flex items-center gap-1 text-sm font-bold ${
                        selectedItem.status === "Positivo" ? "text-[#10B981]" : "text-[#B91C1C]"
                    }`}>

                        {selectedItem.status === "Positivo" ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                        {selectedItem.status}

                    </span>

                 </div>

                 <div className="flex-1 bg-white/5 rounded-xl p-3 border border-white/10 text-center">

                    <p className="text-xs text-white uppercase mb-1">Confiança da IA</p>

                    <span className="text-blue-light text-sm font-bold">{selectedItem.confidence}</span>

                 </div>
            </div>

            {/* Texto Completo */}
            <div className="space-y-2">

                <label className="text-sm text-blue-light font-medium flex items-center gap-2">
                    <MessageSquare size={16} /> Comentário Completo
                </label>

                <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-white text-sm leading-relaxed max-h-60 overflow-y-auto">

                    &quot;{selectedItem.fullText || selectedItem.text}&quot;

                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}