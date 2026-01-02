import { Button } from "@/components/Button";
import { GlassCard } from "@/components/GlassCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10 gap-8">
      
      <h1 className="text-4xl font-poppins font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-DEFAULT to-neon-green">
        UI Kit Check
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Teste Card Azul */}
        <GlassCard gradient="blue" className="p-6 w-64 border-blue-DEFAULT/30">
          <h2 className="text-xl font-bold mb-2">Card Azul</h2>
          <Button variant="primary" className="w-full">Ação Principal</Button>
        </GlassCard>

        {/* Teste Card Laranja (Aviso) */}
        <GlassCard gradient="orange" className="p-6 w-64 border-neon-orange/30">
          <h2 className="text-xl font-bold mb-2 text-neon-orange">Atenção</h2>
          <Button variant="outline" className="w-full">Detalhes</Button>
        </GlassCard>
      </div>

    </main>
  );
}