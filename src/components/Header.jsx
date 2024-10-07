import React from 'react'
import img from '../assets/Img.png';

const Header = () => {
    return (
        <section id='home' className='min-h-[90vh] flex justify-center items-center'>
            <div className="flex justify-center items-center w-full h-full">
                <div className="w-[90%] md:flex md:justify-around items-center md:px-10">
                    <div className="flex justify-center py-4">
                        <div className="">
                            <div className="w-[300px] h-[300px] rounded-full overflow-hidden border border-green-800">
                                <img className='filter drop-shadow-[8px_10px_3px_rgba(0,0,0,.5)] w-full h-full object-cover' src={img} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h1 className='text-4xl text-center'>
                            ¡Hola! Soy <br />
                            <span className='text-green-600 dark:text-blue-600 font-bold'>Diego Cortes</span> <br />
                            <span>y me especializo en ser un</span> <br />
                            <span className='text-blue-600 dark:text-green-600 font-bold'>Programador Web</span>
                        </h1>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Header