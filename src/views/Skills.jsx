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
  PenTool,
  Container,
  Zap,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const skillsRef = useRef(null);
  const titleRef = useRef(null);
  const skillCardsRef = useRef([]);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: skillsRef.current,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        once: true,
      },
    });

    if (!reduceMotion) {
      tl.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }
      ).fromTo(
        skillCardsRef.current,
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 },
        "-=0.3"
      );
    }
  }, []);

  const skills = [
    { name: "React", icon: <Code className="w-12 h-12 text-blue-600" /> },
    { name: "JavaScript", icon: <Zap className="w-12 h-12 text-yellow-500" /> },
    { name: "HTML/CSS", icon: <Globe className="w-12 h-12 text-orange-500" /> },
    {name: "Tailwind CSS",icon: <Palette className="w-12 h-12 text-teal-500" />,},
    { name: "Git", icon: <GitBranch className="w-12 h-12 text-red-500" /> },
    { name: "VS Code", icon: <Code className="w-12 h-12 text-blue-500" /> },
    { name: "PHP/Laravel", icon: <Server className="w-12 h-12 text-green-500" /> },
    { name: "Docker", icon: <Container className="w-12 h-12 text-blue-600" /> },
    { name: "MySQL", icon: <Database className="w-12 h-12 text-blue-600" /> },
  ];

  return (
    <section
      id="skills"
      ref={skillsRef}
      className="py-16 sm:py-20 bg-gray-50 scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Habilidades Técnicas
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Tecnologías y herramientas que domino para crear soluciones
            innovadoras.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              ref={(el) => (skillCardsRef.current[index] = el)}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center group"
            >
              <div className="flex justify-center mb-4 group-hover:animate-bounce">
                {skill.icon}
              </div>
              <h3 className="text-sm font-semibold text-gray-800">
                {skill.name}
              </h3>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Siempre aprendiendo y adaptándome a nuevas tecnologías.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              🚀 Aprendizaje Continuo
            </span>
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              💡 Innovación
            </span>
            <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
              🤝 Colaboración
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
