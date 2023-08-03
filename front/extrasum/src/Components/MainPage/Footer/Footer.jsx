import React from "react";


const Footer = () => {

    return (
        <div
            className="w-full h-16 bg-gray-700 text-white flex justify-center items-center text-center"
        >
            &copy; {(new Date()).getFullYear()} - Laboratoire ERIC
        </div>
    );
};

export default Footer;
