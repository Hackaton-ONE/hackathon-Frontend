export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-8">
      
      {/* Teste da POPPINS (Note a classe 'font-poppins') */}
      <div className="text-center">
        <p className="text-gray-400 mb-2">Fonte Poppins (Títulos):</p>
        <h1 className="font-poppins text-5xl font-bold text-white bg-clip-text bg-linear-to-r from-neon-blue to-neon-green">
          MoodMatrix
        </h1>
      </div>

      {/* Teste da INTER (Padrão, não precisa de classe extra) */}
      <div className="text-center">
        <p className="text-gray-400 mb-2">Fonte Inter (Texto Padrão):</p>
        <h1 className="text-5xl font-inter font-bold text-white">
          MoodMatrix
        </h1>
      </div>

    </main>
  );
}