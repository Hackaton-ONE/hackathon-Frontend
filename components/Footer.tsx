import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 mt-20 lg:mt-32 border-t border-white/15 relative z-10 bg-blue-default/15">
      <div className="max-w-7xl mx-auto px-10 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* =======================
              LADO ESQUERDO
             ======================= */}
          <div className="flex flex-col items-center gap-1">
             <div className="flex items-center gap-2">
                
                {/* Logo MoodMatrix */}
                <div className="relative w-8 h-8">
                   <Image src="/logo.svg" alt="MoodMatrix Logo" fill className="object-contain" />
                </div>
             </div>
             <p className="text-white text-xs font-poppins tracking-wider mt-1">
               Análise Híbrida e precisa.
             </p>
          </div>

          {/* =======================
              LADO DIREITO
             ======================= */}
          <div className="flex items-center gap-8 lg:gap-12">

            {/* 1. Tech Titans */}
            <div className="flex flex-col items-center gap-2 cursor-default">
               <div className="relative w-8 h-8">
                 <Image src="/logo-tt.svg" alt="Tech Titans" fill className="object-contain" />
               </div>
                <p className="text-white text-[10px] font-medium tracking-wider font-poppins mt-1">
                Tech Titans
                </p>
            </div>

            {/* 2. Oracle ONE */}
            <div className="flex flex-col items-center gap-2 cursor-default">
               <div className="relative w-20 h-20">
                 <Image src="/logo-one.svg" alt="Oracle Next Education" fill className="object-contain" />
               </div>
            </div>

            {/* 3. GitHub */}
            <Link 
              href="https://github.com/Hackaton-ONE/hackathon-Frontend" 
              target="_blank"
              className="group flex flex-col items-center gap-2"
            >
               {/* Ícone */}
               <Github className="w-8 h-8 text-white" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}