import { useState, useEffect } from 'react';
import sun from '../assets/sun.svg';
import moon from '../assets/moon.svg';

function Theme() {
    // Establecer el estado inicial basado en localStorage
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });

    // Efecto para cambiar el tema del documento
    useEffect(() => {
        document.body.classList.toggle('dark', darkMode);
        // Guardar el modo en localStorage
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    // Función para alternar el modo
    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    return (
        <button
            onClick={toggleDarkMode}
        >
            <img
                src={darkMode ? sun : moon}
                alt={darkMode ? 'Sun Icon' : 'Moon Icon'}
                className={`w-6 h-6 ${darkMode ? ' text-white' : 'text-white '}`}
            />
        </button>
    );
}

export default Theme;
