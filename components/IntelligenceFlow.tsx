import { ArrowRight } from "lucide-react";

export function IntelligenceFlow() {
  const steps = [
    {
      number: "1",
      title: "Envio de Dados",
      description: "O usuário insere um texto, frase ou comentário através da interface Next.js.",
      bgColor: "bg-blue-default",
      shadow: "shadow-blue-default/30",
      textColor: "text-blue-default"

    },
    {
      number: "2",
      title: "Análise Híbrida",
      description: "O Spring Boot recebe a requisição e aciona o modelo Python para detectar a polaridade.",
      bgColor: "bg-neon-orange",
      shadow: "shadow-neon-orange/30",
      textColor: "text-neon-orange"

    },
    {
      number: "3",
      title: "Resultados & Histórico",
      description: "O resultado é exibido na tela e salvo automaticamente no MySQL para auditoria.",
      bgColor: "bg-neon-green",
      shadow: "shadow-neon-green/30",
      textColor: "text-neon-green"

    },
  ];

  return (
    <section id="IntelligenceFlow" className="py-20 lg:py-32 px-4 lg:px-8 relative scroll-mt-28 z-10">
      <div className="max-w-5xl xl:max-w-7xl mx-auto">
        
        {/* CONTAINER ESCURO */}
        <div className="bg-white/5 backdrop-blur-md border border-blue-dark rounded-3xl p-8 md:p-16 shadow-[-4px_-4px_0px_0px_rgba(0,0,0,0.25),4px_4px_0px_0px_rgba(0,0,0,0.25)]">
          
          {/* Título da Seção */}
          <h2 className="text-3xl lg:text-4xl font-black font-inter text-center mb-16 text-blue-light">
            Fluxo de Inteligência
          </h2>

          <div className="grid md:grid-cols-3 gap-12 relative">
            
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center group">
                
                {/* Círculo com Número */}
                <div className={`
                  w-16 h-16 rounded-full flex items-center justify-center mb-6
                  text-white font-bold text-3xl font-poppins
                  shadow-lg ${step.shadow}
                  ${step.bgColor}
                  transition-transform duration-300 group-hover:scale-110
                `}>
                  {step.number}
                </div>

                {/* Título do Passo */}
                <h3 className={`text-lg font-black font-inter mb-3 ${step.textColor}`}>
                  {step.title}
                </h3>

                {/* Descrição */}
                <p className="text-white text-sm leading-relaxed font-poppins max-w-xs">
                  {step.description}
                </p>

                {/* SETA DESKTOP */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-6 lg:-right-10 transform">
                    <ArrowRight className="w-6 h-6 text-blue-light" />
                  </div>
                )}

                {/* SETA MOBILE */}
                {index < steps.length - 1 && (
                  <div className="md:hidden mt-8 rotate-90">
                     <ArrowRight className="w-6 h-6 text-blue-light" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}