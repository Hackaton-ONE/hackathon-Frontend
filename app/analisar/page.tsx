import { Navbar } from "@/components/Navbar";
import Input_sentimento from "./Componentes/Input_sentimento";
import Sentimentos from "./Componentes/Sentimentos";
import Image from "next/image";

export default function AnalisarPage() {
  return (
    <div className="min-h-screen bg-mood-dark">
      <Navbar />

      <main className="flex flex-col justify-center gap-5 ">
        <Input_sentimento />
        
        <div className="flex justify-center">
          <Image
            width={100}  
            height={10}
            src="/seta_analisar.png"
            alt="Seta"
            className=""
          />
        </div>

        <Sentimentos />
      </main>
    </div>
  );
}
