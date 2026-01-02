"use client"; // Importante porque tem interatividade (abrir/fechar menu)

import Link from "next/link";
import { useState } from "react";
import { Menu, X, BarChart2 } from "lucide-react"; // Ícones
import { Button } from "./Button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-mood-dark/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-blue-DEFAULT/20 rounded-lg group-hover:bg-blue-DEFAULT/30 transition">
              <BarChart2 className="text-neon-blue w-6 h-6" />
            </div>
            <span className="font-poppins font-bold text-xl tracking-tight text-white">
              Mood<span className="text-neon-blue">Matrix</span>
            </span>
          </Link>

          {/* LINKS (Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-300 hover:text-white transition text-sm font-medium">Início</Link>
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition text-sm font-medium">Dashboard</Link>
            <Link href="#sobre" className="text-gray-300 hover:text-white transition text-sm font-medium">Sobre</Link>
            
            <Link href="/analisar">
              <Button variant="primary" className="px-6 py-2 text-sm">
                Analisar
              </Button>
            </Link>
          </div>

          {/* BOTÃO MOBILE (Hambúrguer) */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* MENU MOBILE (Expandido) */}
      {isOpen && (
        <div className="md:hidden bg-mood-dark border-b border-white/10 absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
            <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 rounded-md">Início</Link>
            <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 rounded-md">Dashboard</Link>
            <Link href="/analisar" onClick={() => setIsOpen(false)} className="mt-4">
              <Button variant="primary" className="w-full justify-center">Começar Análise</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}