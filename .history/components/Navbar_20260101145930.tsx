"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

// ✅ CORREÇÃO: O componente NavLink agora está FORA da Navbar
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link 
    href={href} 
    className="relative group text-gray-300 hover:text-white transition-colors font-medium text-sm"
  >
    {children}
    {/* A linha azul mágica 👇 */}
    <span className="
      absolute -bottom-1 left-0 
      w-0 h-[2px] 
      bg-blue-DEFAULT 
      transition-all duration-300 ease-out 
      group-hover:w-full
    " />
  </Link>
);

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-6 left-0 w-full flex justify-center z-50">
      
      {/* Container Principal (A Pílula) */}
      <nav className="
        relative
        flex items-center justify-between
        gap-8
        pl-6 pr-7 py-2
        rounded-full
        bg-white/10
        backdrop-blur-md
        border border-white/20
        shadow-lg shadow-black/10
      ">
        
        {/* === DESKTOP MENU (Escondido no Mobile) === */}
        <div className="hidden md:flex items-center gap-6 font-poppins">
          <NavLink href="/">Início</NavLink>
          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="#sobre">Sobre</NavLink>
        </div>

        {/* === MOBILE TOGGLE (Escondido no Desktop) === */}
        <div className="md:hidden flex items-center pr-4">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-blue-light transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* === BOTÃO DE AÇÃO (Sempre visível) === */}
        <Link href="/analisar">
          <button className="
            bg-white text-mood-dark 
            hover:bg-gray-200
            font-poppins font-bold text-sm
            px-5 py-2.5
            rounded-full
            transition-all duration-200
            shadow-md
          ">
            Analisar
          </button>
        </Link>
      </nav>

      {/* === MENU MOBILE DROPDOWN (Aparece embaixo da pílula) === */}
      {isOpen && (
        <div className="
          absolute top-20 
          w-[90%] max-w-sm 
          bg-mood-dark/95 backdrop-blur-xl 
          border border-white/10 
          rounded-2xl 
          p-4 
          flex flex-col gap-4
          shadow-2xl
          animate-in fade-in slide-in-from-top-5
        ">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white p-2 hover:bg-white/5 rounded-lg transition">Início</Link>
          <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white p-2 hover:bg-white/5 rounded-lg transition">Dashboard</Link>
          <Link href="#sobre" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white p-2 hover:bg-white/5 rounded-lg transition">Sobre</Link>
        </div>
      )}
    </div>
  );
}