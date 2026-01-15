const keywords = [

  { word: "Rápido", value: 95, color: "bg-[#10B981]" },
  { word: "Eficiente", value: 78, color: "bg-[#10B981]" },
  { word: "Lento", value: 65, color: "bg-[#B91C1C]" },
  { word: "Erro", value: 52, color: "bg-[#B91C1C]" },
  { word: "Incrível", value: 35, color: "bg-[#10B981]" },

]

export function TopKeywords() {
  
  return (

    <div className="bg-white/5 backdrop-blur-lg border border-white/50 rounded-2xl p-6 h-full">
      <h3 className="text-white font-poppins font-bold text-md mb-6 uppercase tracking-wide">Top Palavras-Chave</h3>
      <div className="space-y-4">

        {keywords.map((keyword, index) => (

          <div key={index}>

            <div className="flex items-center justify-between mb-2">
              <span className="text-white text-sm">{keyword.word}</span>
            </div>

            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">

              <div
                className={`${keyword.color} h-full rounded-full transition-all duration-500`}
                style={{ width: `${keyword.value}%` }}
              />

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}