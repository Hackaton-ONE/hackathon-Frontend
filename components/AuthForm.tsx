"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; 
import Image from "next/image";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "./Button"; 
import { useForm, Resolver } from "react-hook-form"; 
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// 1. Validação
const loginSchema = z.object({
  email: z.string().email("Digite um e-mail válido"),
  password: z.string().min(1, "A senha é obrigatória"),
});

const registerSchema = z.object({

  email: z.string().email("Digite um e-mail válido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type AuthFormData = {
  email: string;
  password: string;
};

export function AuthForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormData>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema) as Resolver<AuthFormData>,
  });

  const toggleMode = (loginMode: boolean) => {
    setIsLogin(loginMode);
    reset(); 
  };

  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true);

    const baseUrl = "https://mood-matrix-backend.onrender.com";

    if (isLogin) {
      
      // === LOGIN ===
      // O signIn chama o arquivo route.ts, que chama o Java na porta 8090
      const result = await signIn("credentials", {
        redirect: false,
        usuario: data.email, 
        senha: data.password,
      });

      if (result?.error) {
        alert("Erro ao entrar. Verifique suas credenciais.");
        setIsLoading(false);
      } else {
        router.push("/dashboard");
      }

    } else {
      
      // === CADASTRO ===
      try {
       
        const response = await fetch(`${baseUrl}/auth/registrar`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            usuario: data.email,
            senha: data.password,
            
          }),
        });

        if (response.ok) {
          alert("Cadastro realizado com sucesso! Faça login para continuar.");
          toggleMode(true); 
        } else {
          const errorData = await response.json().catch(() => null);
          alert(errorData?.erro || "Erro ao criar conta.");
        }
      } catch (error) {
        console.error("Erro:", error);
        alert("Erro de conexão com o servidor (Verifique se o Java está rodando na porta 8090).");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-mood-dark relative overflow-hidden px-4">
      
      {/* Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-default/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-neon-green/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Cabeçalho */}
        <div className="flex flex-col items-center mb-8">
            <div className="relative w-10 h-10 mb-2">
                <Image src="/logo.svg" alt="MoodMatrix" fill className="object-contain" />
            </div>
            <h2 className="text-2xl font-museo font-bold text-white">
                MoodMatrix
            </h2>
            <p className={`text-sm font-poppins mt-1 transition-colors duration-300 
                ${isLogin ? "text-blue-light" : "text-neon-green"}`}>
                
                {isLogin ? "Bem-vindo de volta!" : "Crie sua conta agora."}
            </p>
        </div>

        {/* Toggle Login/Cadastro */}
        <div className="flex p-1 bg-black/20 rounded-xl mb-8">
            <button 
                type="button" 
                onClick={() => toggleMode(true)}
                className={`flex-1 py-2 text-sm font-poppins font-medium rounded-lg transition-all duration-300 ${
                    isLogin ? "bg-blue-default text-white shadow-lg" : "text-gray-400 hover:text-white"
                }`}
            >
                Entrar
            </button>
            <button 
                type="button"
                onClick={() => toggleMode(false)}
                className={`flex-1 py-2 text-sm font-poppins font-medium rounded-lg transition-all duration-300 ${
                    !isLogin ? "bg-neon-green text-white shadow-lg font-bold" : "text-gray-400 hover:text-white"
                }`}
            >
                Cadastrar
            </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Campo Email */}
            <div className="space-y-1">
                <label className="text-xs text-white font-poppins ml-1">E-mail</label>
                <div className="relative group">
                    <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white transition-colors ${isLogin ? 'group-focus-within:text-blue-default' : 'group-focus-within:text-neon-green'}`} />
                    <input 
                        {...register("email")} 
                        type="email" 
                        placeholder="seu@email.com"
                        className={`w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/60 focus:outline-none focus:bg-black/40 transition-all font-poppins text-sm ${isLogin ? 'focus:border-blue-default/50' : 'focus:border-neon-green/50'}`}
                    />
                </div>
                {errors.email && <p className="text-neon-red text-xs ml-1 font-poppins">{errors.email.message}</p>}
            </div>

            {/* Campo Senha */}
            <div className="space-y-1">
                <div className="flex justify-between items-center ml-1">
                    <label className="text-xs text-white font-poppins">Senha</label>
                </div>
                <div className="relative group">
                    <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white transition-colors ${isLogin ? 'group-focus-within:text-blue-default' : 'group-focus-within:text-neon-green'}`} />
                    <input 
                        {...register("password")} 
                        type="password" 
                        placeholder="••••••••"
                        className={`w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/60 focus:outline-none focus:bg-black/40 transition-all font-poppins text-sm ${isLogin ? 'focus:border-blue-default/50' : 'focus:border-neon-green/50'}`}
                    />
                </div>
                {errors.password && <p className="text-neon-red text-xs ml-1 font-poppins">{errors.password.message}</p>}
            </div>

            {/* Botão de Submit */}
            <Button 
                variant="primary" 
                disabled={isLoading}
                type="submit" 
                className={`w-full py-3 mt-4 flex items-center justify-center gap-2 shadow-lg transition-transform ${
                    !isLogin 
                        ? 'bg-neon-green text-white hover:bg-emerald-400' 
                        : 'bg-blue-default hover:bg-blue-light text-white'       
                }`}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Processando...
                    </>
                ) : (
                    <>
                        {isLogin ? "Entrar na Plataforma" : "Criar Conta Grátis"}
                        <ArrowRight className="w-4 h-4" />
                    </>
                )}
            </Button>

        </form>
        
        {/* Footer */}
        <div className="mt-8 text-center">
             <p className="text-xs text-neon-orange font-poppins">
                &copy; MoodMatrix 2026. Todos os direitos reservados.
             </p>
        </div>
      </div>
    </div>
  );
}