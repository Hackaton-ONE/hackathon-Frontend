/** @type {import('tailwindcss').Config} */
module.exports = {
  // AQUI ESTAVA O ERRO: Adicionamos caminhos sem 'src' também
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    
    // Mantemos o src caso você mova arquivos no futuro
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        mood: {
          dark: "#0F172A",
          nav: "#FFFFFF",
        },
        blue: {
          light: "#60A5FA",
          DEFAULT: "#2563EB",
          dark: "#1E3A8A",
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
        'gradient-pos': 'linear-gradient(to right, #2563EB, #10B981)',
        'gradient-neg': 'linear-gradient(to right, #B91C1C, #F59E0B)',
        'card-blue': 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(96, 165, 250, 0.05) 100%)',
        'card-green': 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(16, 185, 129, 0.05) 100%)',
        'card-red': 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(185, 28, 28, 0.05) 100%)',
      }
    },
  },
  plugins: [],
};