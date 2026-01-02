import Link from "next/link";
import { Button } from "./Button"; // Importando seu botão personalizado

export function HeroSection() {
  return (
    <section className="relative pt-32 lg:pt-48 pb-20 px-4">
      
      {/* =========================================
          ELEMENTOS DECORATIVOS DE FUNDO (GLOWS)
          ========================================= */}
      
{/* 1. ELIPSE MAIOR (Direita/Topo) 
          x: 946.5, y: -78.06 -> right-0 top-[-78px] (Ajustado para responsivo)
          w: 743.5, h: 817.56 -> w-[743px] h-[817px]
          fill: 60A5FA 30% -> bg-blue-light/30
          blur: 160 -> blur-[160px]
      */}
      <div 
        className="
          absolute 
          top-[-500px] lg:top-[-400px] 2xl:top-[-300px] 
          right-[-600px] lg:right-[-400px] 2xl:right-[-300px] /* Ajuste fino para telas diferentes */
          w-[743px] 
          h-[817px] 
          bg-blue-light/30 
          blur-[50px] 
          rounded-full 
          z-0
          pointer-events-none
        " 
      />
      
      {/* 2. ELIPSE MENOR (Esquerda/Baixo) 
          x: -90, y: 546 -> left-[-90px] top-[546px]
          w: 282, h: 343 -> w-[282px] h-[343px]
          fill: 60A5FA 30% -> bg-blue-light/30
          blur: 160 -> blur-[160px]
      */}
      <div 
        className="
          absolute 
          top-[300px] lg:top-[500px] 2xl:top-[400px]
          left-[-200px] lg:left-[-180px] 2xl:left-[-100px]
          w-[282px] 
          h-[343px] 
          bg-blue-light/30 
          blur-[50px] 
          rounded-full 
          z-0 
          pointer-events-none
        " 
      />

      
      {/* =========================================
          CONTEÚDO PRINCIPAL
          ========================================= */}
      <div className="relative z-10 max-w-7xl mx-auto text-center flex flex-col items-center">
        
        {/* TÍTULO */}
        <h1 className="font-inter font-black text-4xl md:text-6xl lg:text-7xl 2xl:text-8xl leading-tight text-white mb-8 md:mb-14 lg:mb-20 max-w-7xl">
          Transforme <span className="italic text-blue-light">ruído digital</span> <br className="hidden md:block" />
          em <span className="italic text-neon-green">insights</span> claros.
        </h1>

        {/* SUBTÍTULO */}
        <p className="font-poppins font-light text-white text-base md:text-xl mb-8 md:mb-14 lg:mb-20 max-w-3xl">
          Nossa IA analisa a polaridade de textos e comentários em segundos. Saia do achismo e tome decisões baseadas em dados concretos.
        </p>

        {/* BOTÕES DE AÇÃO (CTA) */}
        <div className="flex flex-col sm:flex-row gap-8 2xl:gap-10 w-full sm:w-auto">
          <Link href="/analisar">
            <Button variant="primary" className="w-full sm:w-auto text-lg px-8 lg:px-10 py-4 bg-blue-default hover:bg-neon-green font-poppins">
              Começar Análise
            </Button>
          </Link>

          <Link href="#como-funciona">
            <Button variant="outline" className="w-full sm:w-auto text-lg px-8 py-4 bg-white  font-poppins">
              Como Funciona ›
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}