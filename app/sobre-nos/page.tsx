"use client"; // React Icons e interatividade

import { Navbar } from "@/components/Navbar";
import { TechStack } from "@/components/TechStack";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const teamMembers = [
  { name: "Vicente Pascoal", role: "Data Science", img: "/team/foto-vicente.jpeg", linkedin: "https://www.linkedin.com/in/vicente-venancio-pascoal", github: "https://github.com/Vicente-VP" },
  { name: "Lisane Zanatta", role: "Data Science", img: "/team/foto-lisane.jpeg", linkedin: "https://www.linkedin.com/in/lisane-lucia-zanatta-225677317", github: "https://github.com/laisallz" },
  { name: "Kaike de Souza", role: "Data Science", img: "/team/foto-kaike.jpeg", linkedin: "https://www.linkedin.com/in/kaike-gabriel-marques-de-souza-042975333", github: "https://github.com/KaikeGM" },
  { name: "Ludmila Garcia", role: "Data Science", img: "/team/foto-ludmila.jpeg", linkedin: "https://www.linkedin.com/in/ludmila-garcia/", github: "https://github.com/Ludmila-Garcia" },
  { name: "Raphael Medeiros", role: "Backend", img: "/team/foto-raphael.jpeg", linkedin: "https://www.linkedin.com/in/rmedeirosdev", github: "https://github.com/rmedeirosdev" },
  { name: "Cássia Nascimento", role: "Backend", img: "/python.svg", linkedin: "https://www.linkedin.com/in/cassia-irene", github: "https://github.com/cassia-irene" },
  { name: "Júlia de Oliveira", role: "Backend", img: "/team/foto-julia.jpeg", linkedin: "https://www.linkedin.com/in/julia-kellen-oliveira", github: "https://github.com/juliadevcode" },
];

export default function SobreNos() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 py-28 px-6 text-center overflow-hidden rounded-b-3xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 opacity-0 animate-fade-in">
        Projeto MoodMatrix
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-0 animate-fade-in delay-200 text-left md:text-justify leading-relaxed">
          Nascemos da conexão entre 7 mentes inquietas e apaixonadas por tecnologia, todos unidos pela jornada de aprendizado do Programa ONE (Oracle Next Education). No cenário desafiador do Hackathon ONE, decidimos que nossa missão não seria apenas processar dados, mas sim decifrar as emoções por trás deles. 
          <br /><br />
          Assim surgiu o MoodMatrix: um projeto que reflete nossa diversidade e colaboração. Combinamos os conhecimentos técnicos adquiridos em nossa formação com uma visão humana e estratégica para transformar o feedback bruto de milhares de usuários em caminhos claros para o sucesso de qualquer negócio. 
          <br /><br />
          Mais do que desenvolvedores, somos tradutores de sentimentos. Estamos aqui para provar que, com a tecnologia certa e um time sintonizado, é possível transformar palavras em decisões inteligentes e transformar dados em empatia.
        </p>

      </section>

      {/* Missão, Visão, Valores */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid gap-10 md:grid-cols-3">
        {[
          { title: "Missão", text: "Desenvolver soluções tecnológicas acessíveis que gerem valor real." },
          { title: "Visão", text: "Ser referência em produtos de dados e inteligência artificial." },
          { title: "Valores", text: "Inovação, colaboração, ética e impacto positivo." },
        ].map((card) => (
          <div
            key={card.title}
            className="glass p-8 text-center rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition-transform duration-300"
          >
            <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
            <p className="text-white">{card.text}</p>
          </div>
        ))}
      </section>

      {/* Time do projeto */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Nosso Time</h2>

        {/* Data Science */}
        <div className="mb-16 bg-gray-800 rounded-3xl p-10">
          <h3 className="text-2xl font-semibold mb-8 text-center">Data Science</h3>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 justify-items-center">
            {teamMembers
              .filter(member => member.role === "Data Science")
              .map(member => (
                <div key={member.name} className="flex flex-col items-center text-center">
                  <div className="glass w-40 h-40 rounded-full overflow-hidden border-2 border-white/10 shadow-lg relative group hover:shadow-2xl">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 flex items-end justify-center gap-2 pb-2">
                      <a href={member.linkedin} target="_blank" aria-label={`${member.name} LinkedIn`} className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-full transition-transform duration-300 transform hover:scale-110">
                        <FaLinkedin size={16} />
                      </a>
                      <a href={member.github} target="_blank" aria-label={`${member.name} GitHub`} className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-transform duration-300 transform hover:scale-110">
                        <FaGithub size={16} />
                      </a>
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold mt-4">{member.name}</h4>
                  <p className="text-gray-300">{member.role}</p>
                </div>
              ))}
          </div>
        </div>

        {/* Backend */}
        <div className="bg-gray-900 rounded-3xl p-10">
          <h3 className="text-2xl font-semibold mb-8 text-center">Backend</h3>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center justify-items-center">
            {teamMembers
              .filter(member => member.role === "Backend")
              .map(member => (
                <div key={member.name} className="flex flex-col items-center text-center">
                  <div className="glass w-40 h-40 rounded-full overflow-hidden border-2 border-white/10 shadow-lg relative group hover:shadow-2xl">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 flex items-end justify-center gap-2 pb-2">
                      <a href={member.linkedin} target="_blank" aria-label={`${member.name} LinkedIn`} className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-full transition-transform duration-300 transform hover:scale-110">
                        <FaLinkedin size={16} />
                      </a>
                      <a href={member.github} target="_blank" aria-label={`${member.name} GitHub`} className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-transform duration-300 transform hover:scale-110">
                        <FaGithub size={16} />
                      </a>
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold mt-4">{member.name}</h4>
                  <p className="text-gray-300">{member.role}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Tecnologias */}
      <section className="bg-[#0F172A] py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Tecnologias Utilizadas</h2>
        <TechStack />
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center">
        <p>© 2026 Hackathon-ONE. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
