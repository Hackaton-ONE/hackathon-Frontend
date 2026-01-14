"use client";

import { useState } from "react";
import { ResultadoSentimento } from "../types";

type InputSentimentoProps = {
  setResultado: React.Dispatch<React.SetStateAction<ResultadoSentimento | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};


export default function Input_sentimento({ setResultado, setLoading }: InputSentimentoProps) {
    
    const [text, setText] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const apiUrl = isChecked ? `${process.env.NEXT_PUBLIC_API_URL}/tradutor` : `${process.env.NEXT_PUBLIC_API_URL}/sentiment`;


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
          setLoading(true);
          const res = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJSYXBoYWVsIiwiaWF0IjoxNzY4MTU1NTM4LCJleHAiOjE3NjgxNTkxMzh9.4kxUeTTDyUBckjA1da6NpeWFziypjO4PdYwz4rucMhg` },
            body: JSON.stringify({ texto: text }),
          });
      
          const data = await res.json();
          setResultado(data);
        } catch(error) {
            const err = error as Error;
            console.log(isChecked)
            console.log(apiUrl)
            return { success: false, error: err.message };
        }
        finally {
          setLoading(false);
        }
    }
    return (
            <section className="mt-10 md:mt-24 flex w-full justify-center px-4">
                <div className="w-full max-w-4xl h-auto md:h-[450px] rounded-2xl border border-white bg-blue-600/35 p-10 shadow-xl backdrop-blur-md">
                    <form className="flex flex-col items-center gap-8 md:gap-16" onSubmit={handleSubmit}>
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
                                        h-48 md:h-56
                                        w-full
                                        resize-none
                                        rounded-2xl
                                        border
                                        border-white
                                        bg-blue-400/30
                                        p-4 md:p-6
                                        text-white
                                        placeholder-white/80
                                        outline-none
                                        focus:border-blue-400
                                    "
                                />            
                            </div>
                            <div className="flex flex-col sm:flex-row w-full justify-end items-center gap-3 mt-4">
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" className="h-4 w-4" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}/>
                                    <span className="text-sm md:text-lg text-white">Usar Tradutor</span>
                                </div>
                                <div className="w-20 rounded-md bg-blue-500 px-3 py-1 text-sm text-white text-center">
                                    {text.length}/5000
                                </div>
                            </div>
                        </div>

                    
                        <button
                            type="submit"
                            disabled={text.length === 0}
                            className={`
                            w-full sm:w-auto
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
