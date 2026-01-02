import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string; 
  gradient?: "blue" | "green" | "red" | "orange" | "none"; // Adicionei suporte aos seus gradientes
}

export function GlassCard({ children, className = "", gradient = "none" }: GlassCardProps) {
  
  // Mapeia a prop 'gradient' para as classes do Tailwind config
  const gradientBg = {
    none: "bg-mood-nav/5", // Branco 5%
    blue: "bg-card-blue",
    green: "bg-card-green",
    red: "bg-card-red",
    orange: "bg-card-orange",
  };

  return (
    <div
      className={`
        relative overflow-hidden
                 /* O blur do vidro */
        border border-white/10   /* Borda sutil padrão */
        rounded-2xl              /* Bordas arredondadas */
        shadow-xl
        ${gradientBg[gradient]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}