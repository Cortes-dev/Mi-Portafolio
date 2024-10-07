import React, { useState, useEffect } from 'react';
import Theme from './Theme';
import LinkUrl from './LinkUrl';
import img from '../assets/Img.png';

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollPos, setLastScrollPos] = useState(0);
    const [activeLink, setActiveLink] = useState('Home');

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;

            if (currentScrollPos < lastScrollPos) {
                setIsVisible(true);
            } else if (currentScrollPos > 50) {
                setIsVisible(false);
            }

            setLastScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollPos]);

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <div className=''>
            <nav className={`fixed top-0 left-0 w-full transition-transform duration-300 ease-in-out z-50 ${isVisible ? 'translate-y-0' : '-translate-y-[300%]'}`}>
                <div className='justify-center items-center sm:flex hidden'>
                    <ul className='flex space-x-6 py-3 bg-green-600 dark:bg-blue-800 text-white font-semibold px-6 mt-4 rounded-full shadow-lg shadow-green-500 dark:shadow-blue-500'>
                        <LinkUrl text='Home' url='home' activeLink={activeLink} handleLinkClick={handleLinkClick} />
                        <LinkUrl text='Habilidades' url='habilidades' activeLink={activeLink} handleLinkClick={handleLinkClick} />
                        <LinkUrl text='Proyectos' url='proyectos' activeLink={activeLink} handleLinkClick={handleLinkClick} />
                        <LinkUrl text='Contacto' url='contacto' activeLink={activeLink} handleLinkClick={handleLinkClick} />
                        <Theme />
                    </ul>
                </div>
                <div className="sm:hidden flex justify-center">
                    <ul className='flex justify-between w-4/5 px-8 py-1 mt-4 rounded-full bg-green-600 dark:bg-blue-800 shadow-lg shadow-green-500 dark:shadow-blue-500'>
                        <div className="">
                            <div className="rounded-full w-10 h-10 overflow-hidden border border-green-800">
                                <img className='object-fill w-full h-full bg-white' src={img} alt="" />
                            </div>
                        </div>
                        <Theme />
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
