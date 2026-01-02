import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google"; // 1. Importar Poppins
import "./globals.css";

// 2. Configurar Inter
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

// 3. Configurar Poppins (Pesos comuns: 400, 600, 700)
const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "MoodMatrix",
  description: "Análise de sentimentos com IA",
};

export default function RootLayout({
  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      {/* 4. Adicionar ambas as variáveis no body */}
      <body className={`${inter.variable} ${poppins.variable} bg-mood-dark text-white font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}