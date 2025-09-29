import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SITE from '../config/Variables';

const Header = () => {
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const reduceMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

    const dur = (d) => (reduceMotion ? 0 : d);
    const tl = gsap.timeline();

    tl.fromTo(headerRef.current, { opacity: 0 }, { opacity: 1, duration: dur(1) })
      .fromTo(titleRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: dur(0.8) }, "-=0.5")
      .fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: dur(0.6) }, "-=0.3")
      .fromTo(descriptionRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: dur(0.6) }, "-=0.3")
      .fromTo(imageRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: dur(0.8) }, "-=0.5")
      .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: dur(0.5) }, "-=0.3");

    // Mouse tracking animation for the image
    const handleMouseMove = (e) => {
      const rect = headerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      // Move image subtly based on mouse position
      gsap.to(imageRef.current, {
        x: mouseX * 0.05,
        y: mouseY * 0.05,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    if (!isCoarsePointer) {
      headerRef.current.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (headerRef.current) {
        headerRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <header id="home" ref={headerRef} className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-28 sm:pb-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        {/* Text Content */}
        <div className="text-center lg:text-left">
          <h1 ref={titleRef} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Hola, soy <span className="text-blue-600">{SITE.name || 'Tu Nombre'}</span>
          </h1>
          <h2 ref={subtitleRef} className="text-xl sm:text-2xl lg:text-3xl text-gray-700 mb-6">
              {SITE.title || 'Desarrollador Full Stack'}
          </h2>
          <p ref={descriptionRef} className="text-lg text-gray-600 mb-8 max-w-2xl">
              {SITE.summary || 'Creo experiencias web excepcionales con tecnologías modernas. Apasionado por el código limpio, el diseño intuitivo y la resolución de problemas complejos.'}
          </p>
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="#projects"
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Ver mis Proyectos
            </a>
            <a
              href="#contact"
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              Contactarme
            </a>
          </div>
        </div>

        {/* Image */}
        <div ref={imageRef} className="flex justify-center lg:justify-end mt-8 lg:mt-0">
          <div className="relative">
            <div className="w-56 h-56 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl border-8 border-white">
              <img
                src="/Img.png"
                alt="Tu Foto"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            {/* Decorative elements */}
            <div aria-hidden="true" className="absolute -top-4 -right-4 w-20 h-20 bg-blue-200 rounded-full opacity-50"></div>
            <div aria-hidden="true" className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-200 rounded-full opacity-50"></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
        <span className="sr-only">Desplázate</span>
      </div>
    </header>
  );
};

export default Header;