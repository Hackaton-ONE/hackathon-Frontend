import { Navbar } from "@/components/Navbar";

export default function AnalisarPage() {
  return (
    <div className="min-h-screen bg-mood-dark"> {/* Adicionei bg-mood-dark para garantir o fundo */}
      
      {/* 1. A Navbar entra aqui, DENTRO do return */}
      <Navbar />

      {/* 2. O conteúdo da página vem depois */}
      <div className="flex flex-col items-center justify-center pt-32"> {/* pt-32 para não ficar atrás da navbar */}
        <h1 className="text-2xl text-neon-blue font-bold">Analiar</h1>
      </div>
    </div>
  );
}