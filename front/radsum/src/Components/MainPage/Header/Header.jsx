import React from "react";
import { Link } from 'react-router-dom';

import Logo from "./../../../images/logo.png";


const Header = () => {
    return (
        <div
            className={`
                w-full h-16 bg-gray-700 text-white flex justify-between items-center
            `}
        >
            <div
                className="ml-2 sm:ml-8 flex items-center"
            >
                <div>
                    <img src={Logo} alt="Logo" className="w-10 h-10" />
                </div>
                <div
                    className="ml-2 font-bold text-xl"
                >
                    RADSum
                </div>
            </div>
            <div>
                <Link
                    to="/help"
                    className="px-4 py-2 hover:bg-gray-500 rounded-md"
                >Help</Link>
                <Link
                    to="/about"
                    className="mr-2 sm:mr-8 px-4 py-2 hover:bg-gray-500 rounded-md"
                >About</Link>
            </div>
        </div>
    );
};

export default Header;
