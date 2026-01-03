import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, Lock } from "lucide-react";

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
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    ).fromTo(
      cardsRef.current,
      { y: 50, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
      },
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
      technologies: ["Laravel", "Tailwind CSS", "MySQL", "dompdf"],
      demoLink: false,
      codeLink: false,
      status: "private",
    },
    {
      id: 2,
      title: "Antojitos Don Berni",
      description:
        "Sitio web diseñado para Antojitos Don Berni, donde los clientes pueden explorar el menú y mostrar su servicio.",
      image: "/puesto.webp",
      technologies: ["React", "framer-motion", "Tailwind CSS"],
      demoLink: "https://antojitos-don-berni.vercel.app/",
      codeLink: "https://github.com/Cortes-dev/Antojitos-Don-Berni",
      status: "public",
    },
    {
      id: 3,
      title: "Las Catrinas",
      description:
        "Sitio web en progreso para la agencia de viajes MEROAL. Aunque el proyecto se canceló, fue una experiencia útil para aplicar diseño web y planificación de contenidos turísticos.",
      image: "/catrinas.png",
      technologies: [
        "React",
        "Tailwind CSS",
        "GSAP",
        "Framer Motion"
      ],
      demoLink: "https://las-catrinas.vercel.app/",
      codeLink: "https://github.com/Cortes-dev/Las-catrinas",
      status: "public",
    },
    {
      id: 4,
      title: "Landing Page Dr. Chagollán",
      description:
        "Landing page desarrollada para el Dr. Chagollán, especialista en endodoncia, para promover sus servicios dentales y facilitar la comunicación con sus pacientes.",
      image: "/drchagollan.png",
      technologies: ["NextJS", "GSAP", "Framer Motion", "Tailwind CSS", "next-intl"],
      demoLink: "https://xn--drchagollnendo-3gb.com/es/",
      codeLink: "https://github.com/Cortes-dev/Dr.Chagollan-ENDODONCIA",
      status: "public",
    },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      private: {
        text: "Proyecto Privado",
        color: "bg-amber-100 text-amber-800",
      },
      discontinued: {
        text: "Descontinuado",
        color: "bg-gray-100 text-gray-700",
      },
      public: null,
    };
    return badges[status];
  };

  return (
    <section
      id="projects"
      ref={projectsRef}
      className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Mis Proyectos
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Aquí algunos de los proyectos en los que he trabajado. Cada uno
            representa un desafío único y una oportunidad para aprender nuevas
            tecnologías.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, index) => {
            const statusBadge = getStatusBadge(project.status);
            const hasLinks = project.demoLink || project.codeLink;

            return (
              <div
                key={project.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="relative overflow-hidden group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-44 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  {statusBadge && (
                    <div className="absolute top-3 right-3">
                      <span
                        className={`${statusBadge.color} text-xs font-semibold px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm flex items-center gap-1`}
                      >
                        <Lock size={12} />
                        {statusBadge.text}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full border border-blue-200 hover:bg-blue-100 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {hasLinks ? (
                    <div className="flex gap-3">
                      {project.demoLink && (
                        <a
                          href={project.demoLink}
                          className="bg-blue-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex-1 text-center text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={16} />
                          Ver Demo
                        </a>
                      )}
                      {project.codeLink && (
                        <a
                          href={project.codeLink}
                          className="bg-gray-700 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 flex-1 text-center text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github size={16} />
                          Código
                        </a>
                      )}
                    </div>
                  ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-center">
                      <p className="text-gray-500 text-sm font-medium flex items-center justify-center gap-2">
                        <Lock size={14} />
                        {project.status === "discontinued"
                          ? "Proyecto Descontinuado"
                          : "No Disponible Públicamente"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            ¿Interesado en trabajar juntos?
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
