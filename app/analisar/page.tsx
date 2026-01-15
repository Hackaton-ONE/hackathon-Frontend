"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { InputSentimento } from "../../components/analisar/InputSentimento";
import Sentimentos from "../../components/analisar/Sentimentos";
import Image from "next/image";
import { ResultadoSentimento } from "@/types/sentiment";

export default function AnalisarPage() {

  const [resultado, setResultado] = useState<ResultadoSentimento | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-mood-dark">
      <Navbar />

      <main className="flex flex-col justify-center gap-5 ">
        <InputSentimento setResultado={setResultado} setLoading={setLoading}/>
        
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
