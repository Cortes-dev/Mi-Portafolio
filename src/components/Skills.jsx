import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import react from '../assets/React.svg';
import HTML5 from '../assets/HTML5.svg';
import CSS from '../assets/CSS.svg';
import Tailwind from '../assets/Tailwind.svg';
import vite from '../assets/vitejs.svg';
import js from '../assets/js.svg';
import laravel from '../assets/laravel.svg';
import php from '../assets/php.svg';
import mysql from '../assets/mysql.svg';
// Puedes agregar más logos según sea necesario

const Skills = () => {
    const [showFront, setShowFront] = useState(true);

    // Variantes para las tarjetas, controlando la animación de entrada y salida
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },  // Inicialmente oculto y desplazado hacia abajo
        visible: { opacity: 1, y: 0 },  // Visible en su posición normal
        exit: { opacity: 0, y: -50 }    // Se oculta desplazándose hacia arriba
    };

    const Front = [
        { id: 1, name: "HTML", logo: HTML5 },
        { id: 2, name: "CSS", logo: CSS },
        { id: 3, name: "TailwindCSS", logo: Tailwind },
        { id: 4, name: "JavaScript", logo: js },
        { id: 5, name: "vite", logo: vite },
        { id: 6, name: "React", logo: react },
    ];

    const Back = [
        { id: 1, name: "PHP", logo: php },
        { id: 2, name: "Laravel", logo: laravel },
        { id: 3, name: "MySQL", logo: mysql },
    ];

    return (
        <div id='habilidades' className='flex justify-center items-center min-h-screen md:pt-[50px]'>
            <div className="flex justify-center items-center w-full h-full">
                <div className="">
                    <div className="pb-8">
                        <div className="text-center">
                            <h1 className='text-4xl font-bold text-green-600 dark:text-blue-600 uppercase'>Habilidades</h1>
                        </div>
                    </div>
                    <div className="flex justify-center mb-8">
                        {/* Botones para alternar entre Frontend y Backend */}
                        <div className="flex space-x-6">
                            <button
                                className={`p-2 px-4 rounded-full text-white ${showFront ? 'bg-green-600 dark:bg-blue-600' : 'bg-gray-400'}`}
                                onClick={() => setShowFront(true)}
                            >
                                Frontend
                            </button>
                            <button
                                className={`p-2 px-4 rounded-full text-white ${!showFront ? 'bg-green-600 dark:bg-blue-600' : 'bg-gray-400'}`}
                                onClick={() => setShowFront(false)}
                            >
                                Backend
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="flex justify-center">
                            <AnimatePresence mode="wait">
                                {showFront ? (
                                    <motion.div
                                        key="frontend"
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        transition={{ duration: 0.5, staggerChildren: 0.2 }} // Animación de transición y retardo entre las tarjetas
                                        className='flex flex-wrap gap-6 justify-center md:w-3/4'
                                    >
                                        {/* Tarjetas de Frontend */}
                                        {Front.map(skill => (
                                            <motion.div
                                                key={skill.id}
                                                variants={cardVariants}
                                                className="w-24 h-36 md:w-36 md:h-44 bg-white dark:bg-[#171717] shadow-lg rounded-lg p-4 border border-green-600 dark:border-blue-600 text-center space-y-5"
                                            >
                                                <div className="w-full h-20">
                                                    <img className='w-full h-full object-contain p-1' src={skill.logo} alt={skill.name} />
                                                </div>
                                                <span className='dark:text-white flex items-center justify-center md:text-xl'>{skill.name}</span>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="backend"
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        transition={{ duration: 0.5, staggerChildren: 0.2 }} // Animación de transición y retardo entre las tarjetas
                                        className='flex flex-wrap gap-6 justify-center md:w-3/4'>
                                        {/* Tarjetas de Backend */}
                                        {Back.map(skill => (
                                            <motion.div
                                                key={skill.id}
                                                variants={cardVariants}
                                                className="w-24 h-36 md:w-36 md:h-44 bg-white dark:bg-[#171717] shadow-lg rounded-lg p-4 border border-green-600 dark:border-blue-600 text-center space-y-5"
                                            >
                                                <div className="w-full h-20">
                                                    <img className='w-full h-full object-contain p-1' src={skill.logo} alt={skill.name} />
                                                </div>
                                                <span className='dark:text-white flex items-center justify-center md:text-xl'>{skill.name}</span>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skills;