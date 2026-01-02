import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  children: React.ReactNode;
}

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  
  // MUDANÇA 1: 'rounded-full' virou 'rounded-lg' para ficar mais quadrado
  const baseStyles = "px-6 py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 active:translate-y-0.5";
  
  const variants = {
    // MUDANÇA 2: Novo estilo Primary (Sólido + Drop Shadow forte)
    primary: "bg-blue-DEFAULT text-white shadow-md shadow-blue-900/50 hover:shadow-lg hover:shadow-blue-900/70 hover:-translate-y-0.5 border-0",
    
    // Mantive os outros estilos, mas agora eles também são quadrados
    outline: "bg-transparent border-2 border-white/20 text-white hover:bg-white/5 hover:border-white/40",
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