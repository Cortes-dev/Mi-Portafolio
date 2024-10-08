import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contacto = () => {
    const [nombre, setNombre] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://formspree.io/f/xpwzaoyd', { // Reemplaza con tu ID
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, mensaje }),
            });

            if (response.ok) {
                toast.success('¡Mensaje enviado con éxito!', { position: "top-right" });
                setNombre(''); // Reiniciar el nombre
                setMensaje(''); // Reiniciar el mensaje
            } else {
                throw new Error('Error al enviar el mensaje');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Hubo un error al enviar el mensaje. Inténtalo de nuevo.', { position: "top-right" });
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center p-4'>
            <div className='bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 max-w-md w-full'>
                <h1 className='text-2xl font-bold text-center text-green-600 dark:text-blue-600 mb-4'>Contáctame</h1>
                <form autoComplete='off' method='post' onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label htmlFor="nombre" className='block text-gray-700 dark:text-gray-300 mb-2'>Nombre:</label>
                        <input
                            type="text"
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-600 dark:focus:ring-blue-600'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="mensaje" className='block text-gray-700 dark:text-gray-300 mb-2'>Mensaje:</label>
                        <textarea
                            id="mensaje"
                            value={mensaje}
                            onChange={(e) => setMensaje(e.target.value)}
                            required
                            className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-600 dark:focus:ring-blue-600'
                        />
                    </div>
                    <button
                        type="submit"
                        className='w-full bg-green-600 dark:bg-blue-600 text-white font-bold py-2 rounded hover:bg-green-700 dark:hover:bg-blue-700 transition duration-200'
                    >
                        Enviar
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Contacto;