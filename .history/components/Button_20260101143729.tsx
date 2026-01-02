import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  children: React.ReactNode;
}

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  
  const baseStyles = "px-6 py-3 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]";
  
  const variants = {
    primary: "bg-blue-default text-white border-b-2 hover:brightness-110 active:border-b-0 active:translate-y-1",
    
    // Outline (Borda simples)
    outline: "bg-transparent border-2 border-white/20 text-white hover:bg-white/5 hover:border-white/40",
    
    // Ghost (Transparente)
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