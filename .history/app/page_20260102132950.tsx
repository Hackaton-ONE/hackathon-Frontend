import { Navbar } from "@/components/Navbar";
import { HeroSection } from "../components/HeroSection";
import

export default function Home() {
  return (
    <main className="min-h-screen bg-mood-dark text-white selection:bg-neon-green selection:text-mood-dark overflow-x-hidden">
      {/* A Navbar já está no layout.tsx, então não precisa repetir aqui se já colocou lá */}
      <Navbar />
      <HeroSection />

      {/* Aqui virão as próximas seções (Tech Stack, Benefícios, etc.) */}
      
    </main>
  );
}