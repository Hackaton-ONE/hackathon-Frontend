"use client";

import { useState } from "react";
import { ResultadoIA } from "../types";

type InputSentimentoProps = {
  setResultado: React.Dispatch<React.SetStateAction<ResultadoIA | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};


export default function Input_sentimento({ setResultado, setLoading }: InputSentimentoProps) {
    
    const [text, setText] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
          setLoading(true);
          const res = await fetch("/sua-api/analisar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ comentarios: text }),
          });
      
          const data = await res.json();
          setResultado(data);
        } finally {
          setLoading(false);
        }
    }
    return (
            <section className="mt-24 flex w-full justify-center">
                <div className="w-[900px] h-[450px] rounded-2xl border border-white bg-blue-600/35 p-10 shadow-xl backdrop-blur-md">
                    <form className="flex flex-col items-center gap-16">
                        <div className="w-full flex flex-col justify-center">
                            <div className="relative w-full">
                                <textarea
                                    id="sentiment-text"
                                    name="sentiment-text"
                                    maxLength={5000}
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Cole seu texto, review ou comentário aqui para revelar o sentimento oculto..."
                                    className="
                                        h-56
                                        w-full
                                        resize-none
                                        rounded-2xl
                                        border
                                        border-white
                                        bg-blue-400/30
                                        p-6
                                        text-white
                                        placeholder-white/80
                                        outline-none
                                        focus:border-blue-400
                                    "
                                />            
                            </div>
                            <div className="flex w-full justify-end">
                                <div className="w-20 rounded-md bg-blue-500 px-3 py-1 text-sm text-white text-center">
                                    {text.length}/5000
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={text.length === 0}
                            className={`
                            flex
                            items-center
                            gap-2
                            rounded-full
                            bg-gradient-to-r
                            from-blue-500
                            to-emerald-400
                            px-8
                            py-3
                            font-semibold
                            text-white
                            transition
                            hover:opacity-90
                            ${text.length === 0 ? "opacity-50 cursor-not-allowed" : ""}
                            `}
                        >
                            Analisar Sentimento
                            <span aria-hidden="true">›</span>
                        </button>
                    </form>
                </div>
            </section>
    );
}
