"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./Button"; // Usando seu botão personalizado

// Link com animação suave
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link 
    href={href} 
    className="text-gray-300 hover:text-white transition-colors font-medium text-sm px-2 py-1"
  >
    {children}
  </Link>
);

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      
      {/* Container da Navbar (A Pílula que expande) */}
      <nav className={`
        relative
        bg-mood-dark/90       /* Fundo escuro (Mood Dark) */
        backdrop-blur-xl      /* Efeito de vidro forte */
        border border-white/10
        shadow-2xl shadow-black/20
        transition-all duration-300 ease-in-out
        
        /* Comportamento de Forma: Pílula quando fechado, Card quando aberto no mobile */
        ${isOpen ? "rounded-3xl w-full max-w-sm" : "rounded-full w-max"}
        
        p-2
      `}>
        
        <div className="flex items-center justify-between gap-4 px-2">
          
          {/* === 1. LOGO (Estilo da referência) === */}
          <Link href="/" className="flex items-center gap-2 pr-4">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white font-bold text-sm font-poppins">M</span>
            </div>
            {/* Oculta o nome no mobile se estiver fechado para economizar espaço na pílula */}
            <span className={`text-white font-semibold text-sm tracking-tight ${!isOpen ? "hidden sm:block" : "block"}`}>
              MoodMatrix
            </span>
          </Link>

          {/* === 2. LINKS DESKTOP (Escondido no Mobile) === */}
          <div className="hidden md:flex items-center gap-1 border-l border-white/10 pl-4">
            <NavLink href="/">Início</NavLink>
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="#sobre">Sobre</NavLink>
          </div>

          {/* === 3. AÇÕES DESKTOP (Botão + Avatar) === */}
          <div className="hidden md:flex items-center gap-3 pl-2">
            <Link href="/analisar">
              <Button variant="ghost" className="text-sm h-8 px-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full">
                Analisar
              </Button>
            </Link>
            
            {/* Avatar Placeholder (Simulando o shadcn avatar) */}
            <div className="flex items-center gap-2 border-l border-white/10 pl-3">
               <span className="text-xs text-gray-400">Diego</span>
               <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-DEFAULT to-neon-green p-[1px]">
                 <div className="w-full h-full rounded-full bg-mood-dark flex items-center justify-center">
                   <span className="text-xs font-bold text-white">D</span>
                 </div>
               </div>
            </div>
          </div>

          {/* === 4. TOGGLE MOBILE (Hambúrguer) === */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-300 hover:text-white transition rounded-full hover:bg-white/5"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* === 5. MENU MOBILE EXPANDIDO (Dentro da pílula) === */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/10 px-2 pb-2 space-y-2 animate-in fade-in slide-in-from-top-2">
            
            {/* Links Mobile */}
            <Link href="/" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition text-sm">
              Início
            </Link>
            <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition text-sm">
              Dashboard
            </Link>
            <Link href="#sobre" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition text-sm">
              Sobre
            </Link>

            {/* Botão Analisar Mobile */}
            <Link href="/analisar" onClick={() => setIsOpen(false)} className="block mt-2">
               <button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10 font-medium text-sm py-2.5 rounded-xl transition-all">
                 Analisar
               </button>
            </Link>

            {/* Perfil Mobile */}
            <div className="flex items-center gap-3 pt-4 mt-2 border-t border-white/10 px-2">
               <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs font-bold">
                 D
               </div>
               <div className="flex flex-col">
                 <span className="text-sm text-white font-medium">Olá, Diego!</span>
                 <span className="text-xs text-gray-400">Ver perfil</span>
               </div>
            </div>

          </div>
        )}
      </nav>
    </div>
  );
}