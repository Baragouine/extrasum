import React from "react";
import { Link } from 'react-router-dom';

import Logo from "./../../../images/logo.png";


const Header = ( { selectedModel, setSelectedModel } ) => {
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
                    <div className="flex h-full items-center border rounded-md border-white">
                        <div className="pl-2 pr-1 pointer-events-none hidden sm:flex">
                            Model
                        </div>
                        <select
                            id="listModel"
                            name="listModel"
                            value={selectedModel}
                            onChange={(e) => setSelectedModel(e.target.value)}
                            className="block py-2 pl-2 text-sm bg-gray-700 text-white rounded-md sm:rounded-l-none border-white border-l-none sm:border-l"
                        >
                            {listModels.map((model) => (
                            <option key={model.value} value={model.value}>
                                {model.label}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div
                        className="absolute h-full inset-y-0 left-0 flex items-center pl-1 pointer-events-none sm:inline text-white"
                    >
                        <div
                            className="flex w-full items-center"
                        ></div>
                    </div>

                </div>
            </div>
            <div>
                <Link
                    to="/help"
                    className="px-4 py-2 hover:bg-gray-500 rounded-md"
                >Help</Link>
            </div>
        </div>
    );
};

export default Header;
