import React from 'react';

const Card = ({ image, title, desc, lang, buttonText, colorBtn, linkUrlGit, linkUrlDemo }) => {

    const sinMuestra = "No puedo hacer muestra del proyecto";

    return (
        <div className="w-4/5 md:w-[19rem] h-[420px] bg-white dark:bg-[#171717] shadow-lg pb-4 rounded-lg border border-green-600 dark:border-blue-600 text-center space-y-5 overflow-hidden">
            <div className="w-full h-36 border-b mb-3 border-green-600 dark:border-blue-600">
                <img className='w-full h-full object-cover' src={image} alt={title} />
            </div>
            <span className='dark:text-white md:font-semibold md:mt-3 md:text-xl'>{title}</span>
            <p className='text-[14px]'>{desc}</p>

            <div>
                <div className="w-full justify-center flex flex-row space-x-2 my-2 mb-5">
                    {lang.map((langItem, index) => (
                        <div key={index} className='flex items-center text-[12px]'>
                            <span className='bg-green-600 dark:bg-blue-600 rounded-sm text-white px-1'>{langItem}</span>
                        </div>
                    ))}
                </div>
                {(!buttonText) ? (<div className=" flex justify-center space-x-5">
                    <a href={linkUrlGit} target='_blank'
                        className={`p-1 px-3 rounded-md mb-3 text-white bg-green-600 dark:bg-blue-600 shadow-md hover:shadow-green-500 hover:scale-105 transition-all hover:dark:shadow-blue-500 `}
                        disabled
                    >
                        Code
                    </a>
                    <a href={linkUrlDemo} target='_blank'
                        className={`p-1 px-3 rounded-md mb-3 text-white bg-green-600 dark:bg-blue-600 shadow-md hover:shadow-green-500 hover:scale-105 transition-all hover:dark:shadow-blue-500`}
                        disabled
                    >
                        Demo
                    </a>
                </div>) : (
                    <div className="bg-red-600 inline-block rounded-md p-1 px-2 text-white">{sinMuestra}</div>
                )}
            </div>
        </div>
    );
};

export default Card;