import React from "react";


const DelimiterFieldset = ({ delimiter, handleDelimiterChange }) => {
    return (
        <fieldset
            className="border border-gray-300 rounded-md p-1"
        >
            <legend
                className="font-semibold"
            >delimiter</legend>
            <div
                className="flex flex-row text-center justify-center"
            >
                <label
                    className="flex items-center"
                >
                    <input
                        type="radio"
                        value="default"
                        checked={delimiter === 'default'}
                        onChange={handleDelimiterChange}
                        className="mr-2"
                    />
                    default
                </label>
                <label
                    className="flex items-center ml-2"
                >
                    <input
                        type="radio"
                        value="newline"
                        checked={delimiter === 'newline'}
                        onChange={handleDelimiterChange}
                        className="mr-2"
                    />
                    <div
                        className="whitespace-nowrap"
                    >new line</div>
                </label>
            </div>
        </fieldset>
    );
};

export default DelimiterFieldset;