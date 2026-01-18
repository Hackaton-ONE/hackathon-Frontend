import Image from "next/image";

export function WhyChoose() {
  return (
    <section className="py-20 lg:py-32 px-4 lg:px-8 relative z-10 overflow-hidden">
      <div className="max-w-4xl xl:max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 xl:grid-cols-[58%_42%] gap-12 lg:gap-8 xl:gap-20 items-center">

          {/* =========================================
              COLUNA DA ESQUERDA
              ========================================= */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-justify order-2 lg:order-1">
            
            {/* Título */}
            <h2 className="font-inter font-black text-3xl lg:text-[1.65rem] xl:text-[2.58rem] text-neon-green mb-6 max-w-full">
              Por que escolher a MoodMatrix?
            </h2>
            
            {/* Parágrafo Descritivo */}
            <p className="font-poppins text-#FFFFFF text-regular xl:text-xl leading-snug md:max-w-xl lg:max-w-md xl:max-w-full">
              Eliminamos a ambiguidade onde a neutralidade falha. Unindo a robustez do Java à inteligência do Python,
              entregamos classificações binárias precisas para transformar opiniões em decisões imediatas.
            </p>
          </div>

          {/* =========================================
              COLUNA DA DIREITA
              ========================================= */}
          <div className="flex justify-center lg:justify-center order-1 lg:order-2">
            
            {/* Container */}
            <div className="relative w-full max-w-[550px] flex items-center justify-center">
              
              {/* 1. GLOW AZUL */}
              <div className="
                absolute 
                top-1/2 left-1/2 
                -translate-x-1/2 -translate-y-1/2 
                w-[80%] h-[80%] 
                bg-blue-default/60  /* Aumentei a opacidade para brilhar mais igual a ref */
                blur-[90px]         /* Blur alto para ficar suave */
                rounded-full 
                -z-10
              " />

              {/* 2. SOMBRA DE CHÃO */}
              <div className="
                absolute 
                -bottom-4 left-1/2 
                -translate-x-1/2 
                w-[70%] h-4 
                bg-black/40 
                blur-xl 
                rounded-full 
                -z-10
              " />

              {/* A IMAGEM */}
              <Image
                src="/mockup.svg" 
                alt="MoodMatrix Dashboard em Notebook e Mobile"
                width={800} 
                height={600}
                className="relative z-10 object-contain w-full h-auto hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}