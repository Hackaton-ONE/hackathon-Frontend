import { BrainCircuit, Zap, Database } from "lucide-react";

export function ThreePillars() {
  
  const pillars = [
    {
      title: "Precisão Binária",
      description: "Modelo treinado para eliminar a neutralidade. Classificação positiva ou negativa com alto índice de confiança.",
      icon: BrainCircuit,
      gradient: "bg-card-blue", 
      color: "text-blue-light",
      bgColor: "bg-blue-light", 
      iconColor: "text-white"

    },
    {
      title: "Powerhouse Híbrida",
      description: "O melhor de dois mundos: a robustez do Java no backend orquestrando a ciência de dados do Python.",
      icon: Zap,
      gradient: "bg-card-green",
      color: "text-neon-green",
      bgColor: "bg-neon-green",
      iconColor: "text-white"

    },
    {
      title: "Auditoria Total",
      description: "Nada se perde. Cada análise é persistida no MySQL para geração de histórico e inteligência futura.",
      icon: Database,
      gradient: "bg-card-orange",
      color: "text-neon-orange",
      bgColor: "bg-neon-orange",
      iconColor: "text-white"

    }
  ];

  return (
    <section className="py-20 lg:py-32 px-4 lg:px-8 relative z-10">
      <div className="max-w-4xl xl:max-w-6xl mx-auto">
        
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="font-inter font-black text-3xl md:text-4xl lg:text-5xl mb-6">
            <span className="text-blue-light">Inteligência,</span>{" "}
            <span className="text-neon-green">Robustez,</span>{" "}
            <span className="text-neon-orange">Dados.</span>
          </h2>
          <p className="font-poppins text-white text-base mt-10 xl:mt-12 md:text-lg">
            Os três pilares que sustentam nossas decisões.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 xl:gap-10">
          {pillars.map((pillar, index) => (
            <div 
              key={index}
              className={`
                group backdrop-blur-md 
                border border-white/20 rounded-3xl p-8 
                transition-all duration-300 hover:-translate-y-2
                flex flex-col items-center text-center
                bg-mood-dark/40  /* Fundo base escuro e transparente */
                ${pillar.gradient} /* AQUI ENTRA O GRADIENTE */
              `}
            >
              <div className={`
                w-16 h-16 rounded-2xl flex items-center justify-center mb-6 
                shadow-lg shadow-black/25
                ${pillar.bgColor}
              `}>
                <pillar.icon className={`w-8 h-8 ${pillar.iconColor}`} />
              </div>

              <h3 className={`font-inter font-bold text-xl mb-4 ${pillar.color}`}>
                {pillar.title}
              </h3>

              <p className="font-poppins text-white text-sm leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}