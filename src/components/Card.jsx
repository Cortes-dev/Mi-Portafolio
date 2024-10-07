import React from 'react';

const Card = ({ image, title, desc, lang, buttonText, colorBtn }) => {
    return (
        <div className="w-4/5 md:w-[19rem] bg-white dark:bg-[#171717] shadow-lg rounded-lg border border-green-600 dark:border-blue-600 text-center space-y-5 overflow-hidden">
            <div className="w-full h-36">
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
                <button 
                    className={`p-1 px-3 rounded-md mb-3 text-white ${colorBtn ? 'bg-green-600 dark:bg-blue-600' : 'bg-[#CC3300]'}`} 
                    disabled
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default Card;