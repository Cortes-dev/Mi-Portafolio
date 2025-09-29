import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const skillsRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const reduceMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return; // Respeta preferencias de movimiento: sin animaciones

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        once: true,
      }
    });

    tl.fromTo(titleRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
      .fromTo(textRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5")
      .fromTo(skillsRef.current.children, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.08 }, "-=0.4")
      .fromTo(statsRef.current.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.15 }, "-=0.4");
  }, []);

  const skills = [
    { name: 'React', icon: '/Icons/react.png' },
    { name: 'JavaScript', icon: '/Icons/JavaScript.png' },
    { name: 'Tailwind CSS', icon: '/Icons/Tailwind.png' },
    { name: 'PHP', icon: '/Icons/php.png' },
    { name: 'Laravel', icon: '/Icons/laravel.png' },
    { name: 'MySQL', icon: '/Icons/MySQL.png' },
  ];

  const stats = [
    { number: '6', label: 'Proyectos Completados' },
    { number: '3+', label: 'Años de Experiencia' },
    { number: '100%', label: 'Pasión por el Código' },
  ];

  return (
    <section id="about" ref={aboutRef} className="py-16 sm:py-20 bg-gray-50 scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Sobre Mí
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center mb-14 lg:mb-16">
          <div ref={textRef}>
            <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
              Soy un desarrollador apasionado por crear soluciones digitales innovadoras.
              Mi viaje en el mundo del desarrollo web comenzó hace varios años, y desde entonces
              he estado explorando las últimas tecnologías para construir aplicaciones que no solo
              funcionen bien, sino que también brinden experiencias excepcionales a los usuarios.
            </p>
            <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
              Me especializo en desarrollo full-stack, con un enfoque particular en el frontend
              moderno usando React y sus ecosistemas. Creo en el aprendizaje continuo y en la
              importancia de escribir código limpio y mantenible.
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Cuando no estoy programando, me gusta explorar nuevas tecnologías, contribuir a
              proyectos open source y compartir conocimientos con la comunidad.
            </p>
          </div>

          <div ref={skillsRef} className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {skills.map((skill, index) => (
              <div key={index} className="bg-white p-5 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                <img className='w-12 h-12 mx-auto mb-2' src={skill.icon} alt={skill.name} />
                <h3 className="text-xs sm:text-sm font-semibold text-gray-800">{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>

        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
              <div className="text-2xl sm:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">{stat.number}</div>
              <div className="text-sm sm:text-base text-gray-700">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
