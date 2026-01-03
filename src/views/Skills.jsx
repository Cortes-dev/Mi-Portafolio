import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code,
  Palette,
  Globe,
  Server,
  Database,
  GitBranch,
  Container,
  Zap,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      titleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    ).fromTo(
      cardsRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
      },
      "-=0.4"
    );
  }, []);

  const skills = [
    { name: "React", icon: <Code className="w-10 h-10" /> },
    { name: "JavaScript", icon: <Zap className="w-10 h-10" /> },
    { name: "HTML/CSS", icon: <Globe className="w-10 h-10" /> },
    { name: "Tailwind CSS", icon: <Palette className="w-10 h-10" /> },
    { name: "Git", icon: <GitBranch className="w-10 h-10" /> },
    { name: "VS Code", icon: <Code className="w-10 h-10" /> },
    { name: "PHP/Laravel", icon: <Server className="w-10 h-10" /> },
    { name: "Docker", icon: <Container className="w-10 h-10" /> },
    { name: "MySQL", icon: <Database className="w-10 h-10" /> },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Título */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
          >
            Habilidades Técnicas
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tecnologías y herramientas que utilizo para desarrollar soluciones modernas y eficientes.
          </p>
        </div>

        {/* Grid de habilidades */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col items-center justify-center text-center border border-gray-100 hover:border-gray-200"
            >
              <div className="mb-5 text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                {skill.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {skill.name}
              </h3>
            </div>
          ))}
        </div>

        {/* Pie de sección */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Siempre en constante aprendizaje y adaptación a nuevas tecnologías.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-blue-50 text-blue-700 px-5 py-2 rounded-full text-sm font-medium">
              🚀 Aprendizaje Continuo
            </span>
            <span className="bg-green-50 text-green-700 px-5 py-2 rounded-full text-sm font-medium">
              💡 Innovación
            </span>
            <span className="bg-purple-50 text-purple-700 px-5 py-2 rounded-full text-sm font-medium">
              🤝 Colaboración
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;