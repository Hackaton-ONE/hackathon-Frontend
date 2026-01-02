import { Navbar } from "../components/Navbar"; // Navbar já está no layout, mas pode confirmar
import { HeroSection } from "../components/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-mood-dark text-white selection:bg-neon-green selection:text-mood-dark">
      {/* A Navbar já está no layout.tsx, então não precisa repetir aqui se já colocou lá */}
      
      <HeroSection />

      {/* Aqui virão as próximas seções (Tech Stack, Benefícios, etc.) */}
      
    </main>
  );
}