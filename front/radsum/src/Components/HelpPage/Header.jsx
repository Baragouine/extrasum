import React from "react";
import { Link } from 'react-router-dom';

import Logo from "./../../images/logo.png";


const HelpHeader = ( { selectedModel, setSelectedModel } ) => {
    const listModels = [
        { label: 'en/NYT', value: 'en/nyt' },
        { label: 'en/CNN-DailyMail', value: 'en/cnn-dailymail' },
        { label: 'fr/Wiki-Geography', value: 'fr/wiki-geography' }
    ];

    return (
        <div
            className={`
                w-full h-16 pl-4 sm:px-8 bg-gray-700 text-white flex justify-between items-center
            `}
        >
            <div
                className="flex flex-row items-center"
            >
                <div
                    className="flex justify-center bg-white rounded-full py-1 w-8 h-8"
                >
                    <img src={Logo} alt="Logo" width="20px" height="20px" />
                </div>
                <div
                    className="sm:ml-2 font-bold text-xl hidden sm:flex"
                >
                    RADSum
                </div>
                <div
                    className="ml-8 sm:ml-4 h-full flex items-center"
                >

                    <Link
                        to="/"
                        className="px-4 py-2 hover:bg-gray-500 rounded-md"
                    >Summarization</Link>
                </div>
            </div>
            <div>
            </div>
        </div>
    );
};

export default HelpHeader;
