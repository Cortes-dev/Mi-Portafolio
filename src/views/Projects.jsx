import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const projectsRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: projectsRef.current,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        once: true,
      },
    });

    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    ).fromTo(
      cardsRef.current,
      { y: 50, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.15 },
      "-=0.4"
    );
  }, []);

  const projects = [
    {
      id: 1,
      title: "Cotización",
      description:
        "Sistema de cotización de productos que automatiza el proceso de generación de documentos en PDF, agilizando la entrega de presupuestos de manera rápida y profesional.",
      image: "/cotizacion.png",
      technologies: ["Laravel", "Tailwindcss", "MySQL", "dompdf"],
      demoLink: "#",
      codeLink: "#",
    },
    {
      id: 2,
      title: "Antojitos Don Berni",
      description:
        "Sitio web diseñado para Antojitos Don Berni, donde los clientes pueden explorar el menú y mostrar su servicio",
      image: "/puesto.webp",
      technologies: ["React", "framer-motion", "Tailwind CSS"],
      demoLink: "https://antojitos-don-berni.vercel.app/",
      codeLink: "https://github.com/Cortes-dev/Antojitos-Don-Berni",
    },
    {
      id: 3,
      title: "Viajes MEROAL",
      description:
        "Sitio web en progreso para la agencia de viajes MEROAL. Aunque el proyecto se canceló, fue una experiencia útil para aplicar diseño web y planificación de contenidos turísticos.",
      image: "/viajes_meroal.png",
      technologies: ["React", "Tailwind CSS", "Chart.js", "Laravel", "MySQL", "sonner"],
      demoLink: "#",
      codeLink: "#",
    },
    {
      id: 4,
      title: "Portfolio Website",
      description:
        "Sitio web de portafolio personal con animaciones suaves y diseño responsive.",
      image: "/Img.png",
      technologies: ["React", "GSAP", "Tailwind CSS"],
      demoLink: "#",
      codeLink: "#",
    },
  ];

  return (
    <section
      id="projects"
      ref={projectsRef}
      className="py-16 sm:py-20 bg-white scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Mis Proyectos
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Aquí algunos de los proyectos en los que he trabajado. Cada uno
            representa un desafío único y una oportunidad para aprender nuevas
            tecnologías.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-44 sm:h-48 object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* <div className="flex space-x-4">
                  <a
                    href={project.demoLink}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors flex-1 text-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Demo
                  </a>
                  <a
                    href={project.codeLink}
                    className="bg-gray-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-700 transition-colors flex-1 text-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Código
                  </a>
                </div> */}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            ¿Interesado en trabajar juntos?
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
