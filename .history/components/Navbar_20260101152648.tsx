"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

// Componente NavLink (Link com sublinhado azul)
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link 
    href={href} 
    className="relative group text-white transition-colors font-medium text-sm"
  >
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-default transition-all duration-300 ease-out group-hover:w-full" />
  </Link>
);

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Container Principal (Largura Total)
    <div className="fixed top-0 left-0 w-full z-50 px-4 py-10">
      <div className="max-w-8xl mx-auto relative flex items-center justify-between">
        
        {/* =======================
            1. LOGO (Lado Esquerdo)
           ======================= */}
        <Link href="/" className="flex items-center gap-2 z-50">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-white font-bold text-xl font-poppins">M</span>
          </div>
          <span className="text-white font-bold text-lg font-poppins tracking-tight">
            Mood<span className="text-neon-blue">Matrix</span>
          </span>
        </Link>

        {/* =======================
            2. PÍLULA CENTRAL (Links + Botão Analisar)
            (Escondido no Mobile, Absoluto no Centro no Desktop)
           ======================= */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 pl-8 pr-2 py-2 rounded-full bg-mood-dark/80 backdrop-blur-md border border-white/10 shadow-lg shadow-black/20">
          
          {/* Links */}
          <div className="flex items-center gap-6 font-poppins">
            <NavLink href="/">Início</NavLink>
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="#sobre">Sobre</NavLink>
          </div>

          {/* Botão Analisar (Dentro da Pílula) */}
          <Link href="/analisar">
            <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-poppins font-bold text-sm px-5 py-2 rounded-full transition-all duration-200 hover:scale-105 active:scale-95">
              Analisar
            </button>
          </Link>
        </nav>

        {/* =======================
            3. AVATAR / MENU TOGGLE (Lado Direito)
           ======================= */}
        <div className="flex items-center gap-4 z-50">
          
          {/* Avatar (Visível apenas Desktop) */}
          <div className="hidden md:flex items-center gap-2 pl-4">
            <div className="text-right hidden lg:block">
              <p className="font-poppins text-sm font-bold text-white">Olá, Diogo</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neon-green to-emerald-600 flex items-center justify-center text-white font-bold border-2 border-mood-dark shadow-md">
              D
            </div>
          </div>

          {/* Botão Menu Hambúrguer (Apenas Mobile) */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-neon-blue transition p-1"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

      </div>

      {/* =======================
          4. MENU MOBILE DROPDOWN
          (Estilo Escuro da Referência)
         ======================= */}
      {isOpen && (
        <div className="absolute top-20 left-4 right-4 z-40 bg-mood-dark/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl animate-in fade-in slide-in-from-top-5">
          
          <div className="flex flex-col space-y-1">
            <Link href="/" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm font-medium">
              Início
            </Link>
            <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm font-medium">
              Dashboard
            </Link>
            <Link href="#sobre" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm font-medium">
              Sobre
            </Link>
          </div>

          {/* Divisória */}
          <div className="my-3 border-t border-white/10" />

          {/* Botão Analisar Mobile */}
          <Link href="/analisar" onClick={() => setIsOpen(false)}>
            <button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium text-sm py-3 rounded-lg transition-all duration-200">
              Analisar
            </button>
          </Link>

          {/* Perfil Mobile */}
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-green to-emerald-600 flex items-center justify-center text-white font-bold text-xs">
              D
            </div>
            <div>
              <p className="text-sm font-bold text-white">Diego</p>
              <p className="text-xs text-gray-400">diego@exemplo.com</p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}