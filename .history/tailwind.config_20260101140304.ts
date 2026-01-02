/** @type {import('tailwindcss').Config} */
const config = {
  // Configuração de onde o Tailwind procura as classes
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        mood: {
          dark: "#0F172A", // Fundo Azul Escuro
          nav: "#FFFFFF",  // Base para Navbar
        },
        blue: {
          light: "#60A5FA",   // Azul Claro
          DEFAULT: "#2563EB", // Azul Padrão
          dark: "#1E3A8A",    // Azul Escuro
        },
        neon: {
          green: "#10B981",
          red: "#B91C1C",
          orange: "#F59E0B",
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      backgroundImage: {
        // Gradientes de Seta e Barra de Progresso
        'gradient-pos': 'linear-gradient(to right, #2563EB, #10B981)',
        'gradient-neg': 'linear-gradient(to right, #B91C1C, #F59E0B)',
        
        // Gradientes Sutis para os Cards (Glassmorphism)
        'card-blue': 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(96, 165, 250, 0.05) 100%)',
        'card-green': 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(16, 185, 129, 0.05) 100%)',
        'card-red': 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(185, 28, 28, 0.05) 100%)',
        'card-orange': 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(245, 158, 11, 0.05) 100%)', // NOVO
      }
    },
  },
  plugins: [],
};

export default config;