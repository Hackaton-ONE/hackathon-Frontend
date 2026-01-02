import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base
        white: "#FFFFFF",
        
        // Cores da Marca (MoodMatrix)
        mood: {
          dark: "#0F172A",    // Fundo Principal (Deep Blue)
          nav: "#FFFFFF",     // Usar com opacidade (ex: bg-mood-nav/10)
        },
        
        // Tons de Azul
        blue: {
          light: "#60A5FA",   // Elipse hero, cards gradient start
          DEFAULT: "#2563EB", // Tech stack, Seta, Botões principais
          dark: "#1E3A8A",    // Sombras profundas
        },

        // Tons de Status (Neon & Alertas)
        neon: {
          green: "#10B981",   // Positivo (Success)
          red: "#B91C1C",     // Negativo (Error)
          orange: "#F59E0B",  // Avisos e Gradients (Warning)
        },
      },
      
      // Configuração de Fontes
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],    // Fonte padrão (Texto)
        poppins: ['var(--font-poppins)', 'sans-serif'], // Fonte para Títulos
      },
      
      // Gradients Personalizados (Baseados na sua descrição)
      backgroundImage: {
        'gradient-pos': 'linear-gradient(to right, #2563EB, #10B981)', // Seta e Barra Positiva
        'gradient-neg': 'linear-gradient(to right, #B91C1C, #F59E0B)', // Barra Negativa
        'card-blue': 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(96, 165, 250, 0.05) 100%)', // Card Azul sutil
        'card-green': 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(16, 185, 129, 0.05) 100%)', // Card Verde sutil
        'card-red': 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(185, 28, 28, 0.05) 100%)', // Card Vermelho sutil
      }
    },
  },
  plugins: [],
};
export default config;