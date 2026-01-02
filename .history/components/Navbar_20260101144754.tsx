"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname(); // Útil se quiser destacar o link ativo depois

  return (
    // Container que centraliza a navbar no topo da tela
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-max">
      
      {/* A "Pílula" (Floating Navbar) */}
      <div className="
        flex items-center gap-8
        pl-10 pr-7 py-3        /* Espaçamento interno (padding) */
        rounded-3xl          /* Formato de pílula */
        bg-white/10           /* Cor do fundo (10% branco) */
        backdrop-blur-md      /* Efeito de vidro */
        border border-white/20 /* Borda sutil (20% branco) */
        shadow-lg shadow-black/10
      ">
        
        {/* Links de Navegação */}
        <div className="flex items-center gap-6 font-poppins font-medium text-sm">
          <Link 
            href="/" 
            className="text-white hover:text-blue-light transition-colors"
          >
            Início
          </Link>
          <Link 
            href="/dashboard" 
            className="text-gray-300 hover:text-white transition-colors"
          >
            Dashboard
          </Link>
          <Link 
            href="#sobre" 
            className="text-gray-300 hover:text-white transition-colors"
          >
            Sobre
          </Link>
        </div>

        {/* Botão Analisar (Estilo Branco da Imagem) */}
        <Link href="/analisar">
          <button className="
            bg-white text-mood-dark 
            hover:bg-neon
            font-bold text-sm
            px-6 py-2.5
            rounded-lg
            transition-all duration-200
            shadow-md
          ">
            Analisar
          </button>
        </Link>

      </div>
    </nav>
  );
}