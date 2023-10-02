import React, { useState, useEffect, useRef } from "react";

import { SlOptions } from "react-icons/sl";
import { HiChevronDown, HiChevronLeft } from "react-icons/hi";


const DropDownWithInputs = ({ direction, id, isMenu, text, title, children, currentDropDownWithInputsId, setCurrentDropDownWithInputsId, handleClose }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        if (contentRef.current) {
            if (isOpen) {
                const menuStyle = contentRef.current.style;
                if (contentRef.current.getBoundingClientRect().top + contentRef.current.clientHeight >  window.innerHeight) {
                    menuStyle.bottom = 'calc(100% + 0.25rem)';
                } else {
                    if (direction === "left")
                        menuStyle.top = '-0.25rem';
                }
            }
        }
    }, [isOpen]);

    useEffect(() => {
        if (currentDropDownWithInputsId !== id)
            setIsOpen(false);
    }, [currentDropDownWithInputsId])

    return (
        <div
            className="relative"
        >
            <div
                className={(!!text ?
                    `h-full items-center flex hover:bg-gray-500 bg-gray-700 ${isOpen ? "bg-gray-500" : ""}  rounded-md cursor-pointer text-white px-2 py-1`:
                    `h-full items-center flex hover:bg-gray-300 ${isOpen ? "bg-gray-300" : ""} rounded-md px-1 cursor-pointer`) +
                    " text-base"
                }
                onClick={(e) => {
                    if (!!setCurrentDropDownWithInputsId)
                        setCurrentDropDownWithInputsId(id);

                    if (isOpen && !!handleClose)
                        handleClose();

                    setIsOpen(!isOpen);
                }}
                title={title}
                tabIndex={0}
            >
                {(isMenu && direction === "left") && <HiChevronLeft className="bottom-0"/>}
                {text}
                {!isMenu && <SlOptions className="bottom-0"/> }
                {(isMenu && (!direction || direction === "down")) && <HiChevronDown className="bottom-0"/>}
            </div>
            {isOpen &&
                <div
                    ref={contentRef}
                    className={`absolute border border-gray-300 ${isOpen ? "" : " hidden "} ${direction === "left" ? " right-[100%]" : " right-0 "} py-2 px-2 mt-1 bg-white rounded-md`}
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
                            className="w-full bg-gray-700 mt-2 hover:bg-gray-500 text-white rounded-md px-2 py-1"
                            onClick={(e) => {
                                if (isOpen && !!handleClose)
                                    handleClose();

                                setIsOpen(false);    
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            }
        </div>
    );
};

export default DropDownWithInputs;
