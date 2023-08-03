import React, { useState, useEffect, useRef } from "react";

import { SlOptions } from "react-icons/sl";


const DropDownWithInputs = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            if (contentRef.current) {
                if (contentRef.current.getBoundingClientRect().top + contentRef.current.clientHeight >  + window.clientHeight) {
                    const menuStyle = contentRef.current.style;
                    menuStyle.bottom = '0px';
                }
            }
        }
    }, [isOpen]);

    return (
        <div
            className="relative"
        >
            <div
                className={`h-full items-center flex hover:bg-gray-300 ${isOpen ? "bg-gray-300" : ""} rounded-md px-1 cursor-pointer`}
                onClick={(e) => {
                    setIsOpen(!isOpen);
                }}
                title={title}
                tabIndex={0}
            >
                <SlOptions className="bottom-0"/>
            </div>
            <div
                ref={contentRef}
                className={`absolute border border-gray-300 ${isOpen ? "" : " hidden "} right-0 py-2 px-2 mt-1 bg-white rounded-md`}
            >
                <div
                    className="mb-2"
                >
                    { children }
                </div>
                <div
                    className="border-t"
                >
                    <button
                        className="w-full bg-gray-700 mt-2 hover:bg-gray-500 text-white rounded-md"
                        onClick={(e) => setIsOpen(false)}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DropDownWithInputs;
