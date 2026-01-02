import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  children: React.ReactNode;
}

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  
  const baseStyles = "px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95";
  
  const variants = {
    // Gradiente Azul -> Verde (Conforme sua paleta)
    primary: "bg-gradient-to-r from-blue-DEFAULT to-neon-green text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:brightness-110 border-0",
    
    // Apenas borda
    outline: "bg-transparent border border-white/20 text-white hover:bg-white/5",
    
    // Transparente (bom para links no menu)
    ghost:   "bg-transparent text-gray-400 hover:text-white hover:bg-white/5",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
}