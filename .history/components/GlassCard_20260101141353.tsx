import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: "blue" | "green" | "red" | "orange" | "none";
}

export function GlassCard({ children, className = "", gradient = "none" }: GlassCardProps) {
  
  const gradientBg = {
    none: "bg-white/5", // Base neutra mais sutil
    blue: "bg-card-blue",
    green: "bg-card-green",
    red: "bg-card-red",
    orange: "bg-card-orange",
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/10 shadow-xl ${className}`}>
      {/* CAMADA DO VIDRO (Fundo + Blur)
        Fica posicionada absolutamente atrás do conteúdo.
      */}
      <div 
        className={`
          absolute inset-0 
          backdrop-blur-xl 
          ${gradientBg[gradient]} 
          -z-10 /* Garante que fique atrás do conteúdo */
        `} 
        aria-hidden="true"
      />

      {/* CONTEÚDO (Texto, Botões)
        Fica na frente, sem nenhum blur aplicado diretamente nele.
      */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}