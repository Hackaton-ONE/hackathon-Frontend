/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    // Caminhos sem 'src', já que seu projeto está na raiz 'app'
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        mood: { dark: "#0F172A", nav: "#FFFFFF" },
        blue: { light: "#60A5FA", DEFAULT: "#2563EB", dark: "#1E3A8A" },
        neon: { green: "#10B981", red: "#B91C1C", orange: "#F59E0B" },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-pos': 'linear-gradient(to right, #2563EB, #10B981)',
        'gradient-neg': 'linear-gradient(to right, #B91C1C, #F59E0B)',
      }
    },
  },
  plugins: [],
};

export default config;