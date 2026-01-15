"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "./Button";
import { ChevronRight } from "lucide-react";

export function HeroSection() {
  const router = useRouter();
  const pathname = usePathname();

  // Função mágica de suavização (Ease In Out Quad)
  // t = tempo atual, b = valor inicial, c = mudança no valor, d = duração
  const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const smoothScrollTo = (elementId: string) => {
    const target = document.getElementById(elementId);
    if (!target) return;

    // Configurações
    const headerOffset = 100; // Espaço para a Navbar não cobrir o título
    const duration = 1500; // Duração em ms (1.5 segundos - bem suave)

    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition - headerOffset;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      
      window.scrollTo(0, run);

      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  };

  const handleScrollToFlow = (e: React.MouseEvent) => {
    e.preventDefault();

    if (pathname === "/") {
      // Se estiver na Home, usa nossa animação personalizada
      smoothScrollTo("IntelligenceFlow");
    } else {
      // Se estiver fora, navega normal
      router.push("/#IntelligenceFlow");
    }
  };

  return (
    <section className="relative pt-32 lg:pt-48 pb-20 px-4">
      
      {/* =========================================
          ELEMENTOS DECORATIVOS DE FUNDO (GLOWS)
          ========================================= */}
      
{/* 1. ELIPSE MAIOR (Direita/Topo) */}
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
      
      {/* 2. ELIPSE MENOR (Esquerda/Baixo) */}
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
        <div className="flex flex-col sm:flex-row gap-6 md:gap-8 2xl:gap-10 w-full sm:w-auto">
          <Link href="/analisar">
            <Button variant="primary" className="w-full sm:w-auto text-lg px-8 lg:px-10 py-4 bg-blue-default hover:bg-neon-green font-poppins shadow-[0px_4px_4px_0px_#2563EB40] hover:shadow-[0px_4px_4px_0px_#10B98140] transition-shadow duration-300">
              Começar Análise
            </Button>
          </Link>

            <Button
              onClick={handleScrollToFlow}
              variant="outline" 
              className="group w-full sm:w-auto text-lg px-8 py-4 bg-white text-mood-dark font-poppins shadow-[0px_4px_4px_0px_#FFFFFF40] flex items-center gap-0.5">
              Como Funciona 
              <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
            </Button>
          
        </div>

      </div>
    </section>
  );
}