import Link from "next/link";
import { Button } from "./Button"; // Importando seu botão personalizado

export function HeroSection() {
  return (
    <section className="relative pt-32 lg:pt-48 pb-20 px-4 overflow-hidden">
      
      {/* =========================================
          ELEMENTOS DECORATIVOS DE FUNDO (GLOWS)
          ========================================= */}
      
      {/* 1. Glow Azul Superior (Central) */}

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-blue-DEFAULT/20 blur-[120px] rounded-full z-10 pointer-events-none" />

      

      {/* 2. Glow Verde/Cyan (Canto inferior direito - Sutil) */}

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-neon-green/10 blur-[100px] rounded-full z-10 pointer-events-none" />

      
      {/* =========================================
          CONTEÚDO PRINCIPAL
          ========================================= */}
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* TÍTULO */}
        <h1 className="font-inter font-black text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight text-white mb-8 lg:mb-20">
          Transforme <span className="italic text-blue-light">ruído digital</span> <br className="hidden md:block" />
          em <span className="italic text-neon-green">insights</span> claros.
        </h1>

        {/* SUBTÍTULO */}
        <p className="font-poppins font-light text-white text-base md:text-xl mb-8 lg:mb-20 max-w-3xl">
          Nossa IA analisa a polaridade de textos e comentários em segundos. 
          Saia do achismo e tome decisões baseadas em dados concretos.
        </p>

        {/* BOTÕES DE AÇÃO (CTA) */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/analisar">
            <Button variant="primary" className="w-full sm:w-auto text-lg px-8 lg:px-10 py-4 bg-blue-default hover:bg-neon-green font-poppins">
              Começar Análise
            </Button>
          </Link>

          <Link href="#como-funciona">
            <Button variant="outline" className="w-full sm:w-auto text-lg px-8 py-4">
              Como Funciona ›
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}