import React from 'react';
import cotizacion from '../assets/cotizacion.png';
import puesto from '../assets/puesto.webp';
import Card from './Card';

const Project = () => {
    const LangCot = [
        'HTML5',
        'CSS3',
        'Tailwind CSS',
        'Laravel',
        'MySQL',
    ];

    const LangPuesto = [
        'HTML5',
        'CSS3',
        'Tailwind CSS',
        'Vite',
    ];

    return (
        <div id='habilidades' className='flex justify-center items-center min-h-screen md:pt-[50px]'>
            <div className="flex justify-center items-center w-full h-full">
                <div>
                    <div className="pb-8 text-center">
                        <h1 className='text-4xl font-bold text-green-600 dark:text-blue-600 uppercase'>Proyectos</h1>
                    </div>

                    <div className="flex justify-center flex-col md:flex-row gap-4 items-center">
                        <Card
                            image={cotizacion}
                            title="Cotización"
                            desc="Se desarrolló un sistema de cotización que permite a la empresa generar cotizaciones directas sin usar Excel. El software crea automáticamente el PDF con la conversión de moneda y el cálculo de impuestos."
                            lang={LangCot}
                            buttonText="No puedo hacer muestra del proyecto"
                            colorBtn={false}
                        />

                        <Card
                            image={puesto}
                            title="Antojitos Don Berni"
                            desc="Se desarrolló una página web para un puesto de comida, permitiendo a los clientes explorar fácilmente los productos y platillos que se ofrecen, mejorando así su experiencia de compra y conocimiento del menú disponible."
                            lang={LangPuesto}
                            buttonText="code"
                            colorBtn={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Project;