import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ResultadoIA } from "./types"; 
import Input_sentimento from "./Componentes/Input_sentimento";
import Sentimentos from "./Componentes/Sentimentos";
import Image from "next/image";

export default function AnalisarPage() {
const [resultado, setResultado] = useState<ResultadoIA | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-mood-dark">
      <Navbar />

      <main className="flex flex-col justify-center gap-5 ">
        <Input_sentimento setResultado={setResultado} setLoading={setLoading}/>
        
        <div className="flex justify-center">
          <Image
            width={100}  
            height={10}
            src="/seta_analisar.png"
            alt="Seta"
            className=""
          />
        </div>

        <Sentimentos resultado={resultado} loading={loading}/>
      </main>
    </div>
  );
}
