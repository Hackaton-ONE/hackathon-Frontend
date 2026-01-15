"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

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
  // Novo estado para controlar o menu do perfil (Clique para abrir/fechar)
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const { data: session, status } = useSession();

  const userName = session?.user?.name || "Usuário";
  const firstName = userName.split(" ")[0]; 
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=00f0ff&color=050505&bold=true`;

  return (
    <div className="relative top-0 left-0 w-full z-50 px-8 py-8">

      <div className="max-w-[1600px] mx-auto flex justify-between items-center lg:grid lg:grid-cols-3">
        
        {/* =======================
            1. LOGO
           ======================= */}
        <div className="flex justify-start">
          <Link href="/" className="flex items-center gap-1 z-50 group">
            <div className="relative w-8 h-8 lg:w-9 lg:h-9 flex items-center justify-center">
              <Image
                src="/logo.svg"
                alt="Logo MoodMatrix"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-white font-medium text-xs font-museo tracking-wider">
              Mood<span>Matrix</span>
            </span>
          </Link>
        </div>

        {/* =======================
            2. PÍLULA CENTRAL (Desktop)
           ======================= */}
        <div className="hidden lg:flex justify-center">
          <nav className="flex items-center gap-8 pl-8 pr-8 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/20">
            <div className="flex items-center gap-6 font-poppins">
              <NavLink href="/">Início</NavLink>
              <NavLink href="/dashboard">Dashboard</NavLink>
              <NavLink href="#sobre">Sobre</NavLink>
            </div>

            <Link href="/analisar">
              <button className="bg-white hover:bg-neon-orange text-black font-poppins font-bold text-sm px-5 py-2 rounded-md transition-all duration-200 shadow-sm hover:shadow-md">
                Analisar
              </button>
            </Link>
          </nav>
        </div>

        {/* =======================
            3. ÁREA DE LOGIN / PERFIL (Desktop)
           ======================= */}
        <div className="flex justify-end items-center gap-4 z-50">
          
          <div className="hidden lg:block">
            {status === "authenticated" ? (
               // === USUÁRIO LOGADO (Desktop) ===
               <div className="flex items-center gap-3">
                  {/* TEXTO EM LINHA ÚNICA */}
                  <p className="font-poppins text-sm font-bold text-white">
                    Olá, <span className="font-bold text-white">{firstName}</span>
                  </p>
                  
                  {/* Avatar com Clique para abrir menu */}
                  <div className="relative">
                      {/* Botão do Avatar - Adicionado onClick */}
                      <button 
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className={`w-10 h-10 rounded-full border-2 overflow-hidden relative transition-all duration-300 ${isProfileOpen ? 'border-neon-green scale-105' : 'border-white hover:scale-105'}`}
                      >
                         <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                      </button>
                      
                      {/* Menu Flutuante de Sair - Agora controlado pelo estado isProfileOpen */}
                      <div className={`absolute top-14 right-0 w-32 transition-all duration-300 transform z-50 ${
                          isProfileOpen 
                            ? 'opacity-100 translate-y-0 pointer-events-auto'
                            : 'opacity-0 -translate-y-2 pointer-events-none'
                        }`}
                      >
                        <button 
                            onClick={() => signOut({ callbackUrl: "/login" })}
                            className="w-full bg-neon-red border border-white/30 p-3 rounded-xl shadow-xl flex items-center justify-center gap-2 text-white text-xs font-bold transition-colors"
                        >
                            <LogOut size={14} /> Sair da conta
                        </button>
                      </div>
                  </div>
               </div>
            ) : (
               // === USUÁRIO DESLOGADO (Desktop) ===
               <Link href="/login">
                  <button className="bg-neon-green text-white hover:bg-emerald-400 font-poppins font-bold text-sm px-6 py-2.5 rounded-md transition-all shadow-md hover:shadow-lg hover:scale-105">
                    Entrar / Cadastrar
                  </button>
               </Link>
            )}
          </div>

          {/* Botão Hambúrguer (Mobile) */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white hover:text-neon-blue transition p-1"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

      </div>

      {/* =======================
          4. MENU MOBILE (Mantido igual)
         ======================= */}
      {isOpen && (
        <div className="lg:hidden absolute top-24 left-4 right-4 z-10 bg-mood-dark/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl animate-in fade-in slide-in-from-top-5">
          
          <div className="flex flex-col space-y-1">
            <Link href="/" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-white/90 hover:text-white hover:bg-blue-default rounded-lg transition-colors font-poppins text-sm font-semibold">
              Início
            </Link>
            <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-white/90 hover:text-white hover:bg-blue-default rounded-lg transition-colors font-poppins text-sm font-semibold">
              Dashboard
            </Link>
            <Link href="#sobre" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-white/90 hover:text-white hover:bg-blue-default rounded-lg transition-colors font-poppins text-sm font-semibold">
              Sobre
            </Link>
          </div>

          <div className="my-3 border-t border-white/10" />

          <Link href="/analisar" onClick={() => setIsOpen(false)}>
            <button className="w-full bg-white hover:bg-neon-orange text-mood-dark border border-white/20 font-poppins font-bold text-sm py-3 rounded-lg transition-all duration-200">
              Analisar
            </button>
          </Link>

          {/* ÁREA DE LOGIN / PERFIL (Mobile) */}
          <div className="mt-4 pt-4 border-t border-white/10">
            {status === "authenticated" ? (
                // === MOBILE LOGADO ===
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                        <img src={avatarUrl} alt="Avatar" className="w-12 h-12 rounded-full border border-white/20" />
                        <div className="overflow-hidden">
                            <p className="text-white font-bold truncate">{userName}</p>
                            <p className="text-xs text-gray-400 truncate">{session.user?.email}</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => {
                            setIsOpen(false);
                            signOut({ callbackUrl: "/login" });
                        }}
                        className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-2.5 rounded-lg transition-colors text-sm font-bold"
                    >
                        <LogOut size={16} /> Sair da conta
                    </button>
                </div>
            ) : (
                // === MOBILE DESLOGADO ===
                <Link 
                    href="/login" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 group p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center group-hover:bg-neon-green group-hover:text-mood-dark transition-all">
                        <User className="w-5 h-5 text-gray-300 group-hover:text-mood-dark" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white group-hover:text-neon-green transition-colors">Fazer Login</p>
                        <p className="text-xs text-gray-400">Acesse ou crie sua conta</p>
                    </div>
                </Link>
            )}
          </div>

        </div>
      )}
    </div>
  );
}