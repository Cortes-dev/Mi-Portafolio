import React from 'react';

const LinkUrl = ({ text, url, activeLink, handleLinkClick }) => {
    return (
        <li>
            <a
                className={`${activeLink === text ? 'bg-white text-blue-600 dark:text-green-600 p-1 px-3 rounded-full transition-transform transform translate-x-2'
                    : 'hover:bg-white hover:text-blue-600 dark:hover:text-green-600 p-1 px-3 rounded-full transition-transform transform'
                    }`}
                href={`#${url}`}
                onClick={() => handleLinkClick(text)} >
                {text}
            </a>
        </li>
    );
};

export default LinkUrl;
