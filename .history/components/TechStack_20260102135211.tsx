import React from "react";
import Image from "next/image";

export function TechStack() {
  
  // Lista dos ícones com seus SVGs exatos
    const technologies = [
        { name: "Figma", src: "/figma.svg" },
            { name: "Next.js", src: "/next.svg" },       // Confirme se é next.svg ou nextjs.svg
            { name: "Material UI", src: "/mui.svg" },    // Confirme o nome
            { name: "Spring Boot", src: "/spring.svg" }, // Confirme o nome
            { name: "Python", src: "/python.svg" },
            { name: "MySQL", src: "/mysql.svg" },
            { name: "Docker", src: "/docker.svg" }
    ];

  return (
    <section className="py-12 md:py-24 px-4 lg:px-8 relative z-20"> {/* z-20 para ficar acima de qualquer glow residual */}
      <div className="max-w-5xl mx-auto">
        
        {/* Container Escuro e Longo (Igual à imagem) */}
        <div className="bg-blue-default/10 backdrop-blur-md border-2 border-blue-default/20 rounded-3xl p-6 lg:p-10 shadow-2xl">
          
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 lg:gap-12">
            
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="group relative flex items-center justify-center"
              >
                {/* O Bloco Azul Sólido */}
                <div className="
                  w-16 h-16 md:w-20 md:h-20 
                  bg-blue-default 
                  rounded-2xl 
                  flex items-center justify-center 
                  shadow-lg shadow-blue-900/40 
                  transition-all duration-300 
                  group-hover:scale-110 group-hover:bg-blue-600
                  border border-white/10
                ">
                  {/* Ícone SVG Branco */}
                  <div className="relative w-8 h-8 md:w-10 md:h-10">
                    <Image
                        src={tech.src}
                        alt={tech.name}
                        fill
                        className="object-contain "
                    />

                  </div>
                </div>

                {/* Tooltip opcional (Nome da tecnologia) */}
                <span className="
                  absolute -bottom-8 left-1/2 -translate-x-1/2 
                  text-xs font-poppins text-white
                  opacity-0 group-hover:opacity-100 transition-opacity
                  whitespace-nowrap
                ">
                  {tech.name}
                </span>
              </div>
            ))}

          </div>
        </div>
        
      </div>
    </section>
  );
}