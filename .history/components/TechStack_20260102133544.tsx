import React from "react";

export function TechStack() {
  
  // Lista dos ícones com seus SVGs exatos
  const technologies = [
    {
      name: "Figma",
      path: (
        <path d="M8.333 12.5c0 1.84 1.494 3.333 3.334 3.333h1.666V12.5h-5zm0-4.167c0-1.84 1.493-3.333 3.334-3.333h1.666v3.333h-5zm0 8.334c0 1.84 1.494 3.333 3.334 3.333 1.84 0 3.333-1.493 3.333-3.333V12.5h-1.667v4.167h-5zM16.667 5H15V8.333h1.667c1.84 0 3.333-1.493 3.333-3.333S18.507 5 16.667 5zm0 4.167H15V12.5h1.667c1.84 0 3.333-1.494 3.333-3.333s-1.493-3.334-3.333-3.334z" />
      ),
    },
    {
      name: "Next.js",
      path: (
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.72 15.28h-1.63L10.66 10.4V17.3H8.92V7h1.63l4.52 7.02V7h1.65v10.28z" />
      ),
    },
    {
      name: "Material UI",
      path: (
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 18V6h5.33l2.67 4 2.67-4H20v12h-4v-6.34l-2.67 4-2.67-4V18H4z" />
      ),
    },
    {
      name: "Spring Boot",
      path: (
        <path d="M19.14 7.5A8.7 8.7 0 0012.2 3.36a2.68 2.68 0 011.63.92 9.07 9.07 0 011.94 4.1c.14 1 .28 2.05.5 3.06.66 2.94 2.4 3.52 2.87 3.22.46-.3.23-2.14 0-7.16zM13.43 19a11.58 11.58 0 01-.65-4.25c.03-1.6.43-3.5 1.1-5.1.47-1.15.5-2.06.07-2.33-.52-.33-1.9.92-3.1 3.5a13.3 13.3 0 00-1.4 6.7c0 1.83.27 3.1.6 4.1.33.95 2.12.3 3.38-2.62z" />
      ),
    },
    {
      name: "Python",
      path: (
        <path d="M12.02 2c-2.13 0-4.04.35-4.04 2.37V6H5.4C3.26 6 2 7.37 2 9.48v5.18c0 1.95 1.5 2.5 3.1 2.5h1.56v-2.07c0-1.78.47-2.8 2.52-2.8h4.52V9.8c0-1.84-1.2-2.6-2.9-2.6h-2V5.7c0-1.07 1.1-1.37 2.18-1.37h2.75c1.08 0 1.35.82 1.35 1.9v1.44h2.7V5.7C17.8 3.57 15.86 2 12.02 2zM9.4 14.5c-1.1 0-1.36.8-1.36 1.88v1.46H5.3v-1.9c0-1.83 1.2-2.6 2.9-2.6h3.2v-1.16c0-2.1 1.9-2.47 4.02-2.47 2.14 0 4.05.35 4.05 2.37V14.6h-2.6c0-1.08-1.07-1.37-2.15-1.37h-2.73c-1.1 0-1.37.8-1.37 1.88v2.5c0 1.83 1.2 2.62 2.9 2.62h2v1.5c0 1.06-1.1 1.36-2.18 1.36H9.4v-1.44z" />
      ),
    },
    {
      name: "MySQL",
      path: (
        <path d="M20.2 13c-2.4.3-4.3 1.4-5.3 3-.3.5-.5 1-.6 1.6-.2-1.3-1.6-1.5-2.3-1.6-2.2-.3-4.4.6-5.4 2.6-.5 1-.6 2.2-.2 3.3.4 1 1.4 1.7 2.4 2 .1 0 .2 0 .4 0 1.2-.1 2.3-.9 2.8-2 .1-.3.2-.6.3-1 .2 1.3 1.5 2.1 2.8 1.9 1.8-.3 3.3-1.7 3.8-3.4.5-1.6.2-3.4-1-4.7.9-.6 1.8-1.1 2.8-1.4.1 0 .2-.1.3-.1-.2-.1-.5-.1-.8-.2zm-12.8 4c-.6 0-1-.5-1-1.1 0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1 0 .6-.5 1.1-1.1 1.1zm6 0c-.6 0-1.1-.5-1.1-1.1 0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1 0 .6-.5 1.1-1.1 1.1z" />
      ),
    },
    {
      name: "Docker",
      path: (
        <path d="M1.9 10.3c-.6 0-1.1.5-1.1 1.1v3.2c0 .6.5 1.1 1.1 1.1h3.2c.6 0 1.1-.5 1.1-1.1v-3.2c0-.6-.5-1.1-1.1-1.1H1.9zm5.3-2.1c-.6 0-1.1.5-1.1 1.1v5.3c0 .6.5 1.1 1.1 1.1h3.2c.6 0 1.1-.5 1.1-1.1V9.3c0-.6-.5-1.1-1.1-1.1H7.2zm5.3 0c-.6 0-1.1.5-1.1 1.1v5.3c0 .6.5 1.1 1.1 1.1h3.2c.6 0 1.1-.5 1.1-1.1V9.3c0-.6-.5-1.1-1.1-1.1h-3.2zm5.3-2.2c-.6 0-1.1.5-1.1 1.1v7.5c0 .6.5 1.1 1.1 1.1h3.2c.6 0 1.1-.5 1.1-1.1V6c0-.6-.5-1.1-1.1-1.1h-3.2z" />
      ),
    }
  ];

  return (
    <section className="py-12 md:py-24 px-4 lg:px-8 relative z-20"> {/* z-20 para ficar acima de qualquer glow residual */}
      <div className="max-w-5xl mx-auto">
        
        {/* Container Escuro e Longo (Igual à imagem) */}
        <div className="bg-blue-default/10 backdrop-blur-md border border-blue-default/10 rounded-3xl p-6 lg:p-10 shadow-2xl">
          
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 lg:gap-12">
            
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="group relative flex items-center justify-center"
              >
                {/* O Bloco Azul Sólido */}
                <div className="
                  w-16 h-16 md:w-20 md:h-20 
                  bg-blue-DEFAULT 
                  rounded-2xl 
                  flex items-center justify-center 
                  shadow-lg shadow-blue-900/40 
                  transition-all duration-300 
                  group-hover:scale-110 group-hover:bg-blue-600
                  border border-white/10
                ">
                  {/* Ícone SVG Branco */}
                  <svg 
                    className="w-8 h-8 md:w-10 md:h-10 text-white fill-current" 
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {tech.path}
                  </svg>
                </div>

                {/* Tooltip opcional (Nome da tecnologia) */}
                <span className="
                  absolute -bottom-8 left-1/2 -translate-x-1/2 
                  text-xs font-poppins text-gray-400 
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