"use client"

import type React from "react"
import { ResultadoSentimento } from "@/types/sentiment"
import { useState } from "react"
import { ChevronRight } from "lucide-react"
// 👇 1. Importa o hook do NextAuth
import { useSession } from "next-auth/react"

type InputSentimentoProps = {
  setResultado: React.Dispatch<React.SetStateAction<ResultadoSentimento | null>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export function InputSentimento({ setResultado, setLoading }: InputSentimentoProps) {
  const [text, setText] = useState("")
  const [isChecked, setIsChecked] = useState(false)

  // 👇 2. Pega a sessão (onde o token mora agora)
  const { data: session } = useSession();

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8090";
  const endpoint = isChecked ? "/sentiment/tradutor" : "/sentiment";
  const apiUrl = `${baseUrl}${endpoint}`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // 👇 3. Pega o token da sessão do NextAuth
    // Lembre-se: configuramos no route.ts como 'accessToken'
    const token = session?.accessToken;

    if (!token) {
      alert("Você precisa estar logado para analisar!");
      return;
    }

    try {
      setLoading(true)
      
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 👇 4. Usa o token no formato Bearer
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ texto: text }),
      })

      if (!res.ok) {
        if (res.status === 403) throw new Error("Sessão expirada. Faça login novamente.");
        throw new Error(`Erro na API: ${res.status}`);
      }

      const data = await res.json()
      setResultado(data)
      
    } catch (error) {
      const err = error as Error
      console.error(err)
      alert(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative mt-24 flex w-full justify-center px-4">
      {/* --- GLOW EFFECT --- */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[80%] md:w-[600px] rounded-full bg-white/15 blur-[180px] z-10 pointer-events-none" 
        aria-hidden="true"
      />

      {/* --- CARD PRINCIPAL --- */}
      <div className="relative z-10 w-full max-w-4xl rounded-2xl border border-blue-default bg-blue-default/10 p-8 md:p-10 shadow-[-4px_-4px_8px_0_rgba(0,0,0,0.25),4px_4px_8px_0_rgba(0,0,0,0.25)] backdrop-blur-md">
        <form className="flex flex-col items-center gap-8" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col gap-4">
            <div className="relative w-full">
              <textarea
                id="sentiment-text"
                name="sentiment-text"
                maxLength={5000}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Cole seu texto, review ou comentário aqui para revelar o sentimento oculto..."
                className="
                  h-48
                  md:h-56
                  w-full
                  resize-none
                  rounded-2xl
                  border
                  border-white/60
                  bg-blue-light/40
                  p-5
                  md:p-8
                  font-inter
                  font-regular
                  text-white
                  text-base
                  text-center
                  placeholder-white
                  outline-none
                  focus:border-blue-default
                  transition-all
                "
              />
            </div>

            <div className="flex w-full justify-between items-center">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="translator-checkbox"
                  className="h-4 w-4 rounded border-neon-green bg-neon-green text-white cursor-pointer"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <label htmlFor="translator-checkbox" className="font-inter font-medium text-base text-white cursor-pointer select-none">
                  Usar Tradutor
                </label>
              </div>

              <div className="rounded-lg bg-blue-dark border border-blue-default px-3 py-1.5 text-sm font-inter font-bold text-white">
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
              from-blue-default
              to-neon-green
              px-8
              py-3.5
              text-base
              font-poppins
              font-semibold
              text-white
              transition-all
              duration-300
              hover:shadow-lg
              hover:shadow-cyan-500/50
              hover:scale-105
              ${text.length === 0 ? "opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none" : ""}
            `}
          >
            Analisar Sentimento
            <ChevronRight className="w-5 h-5" strokeWidth={3} />
          </button>
        </form>
      </div>
    </section>
  )
}