import React from "react";


const SummaryLengthFieldset = ({ handleSumLengthUnitChange, sumLengthUnit, sumLength, handleSumLengthChange }) => {
    return (
        <fieldset
            className="border border-gray-300 rounded-md p-1 ml-2"
        >
            <legend
                className="font-semibold"
            >summary length</legend>
            <div
                className="flex flex-row text-center justify-center"
            >
                <input
                    type="number"
                    value={sumLength}
                    className="border border-gray-200 pl-0.5"
                    min={sumLengthUnit === "char" ? process.env.REACT_APP_MIN_SUM_CHARS : process.env.REACT_APP_MIN_SUM_LINES}
                    max={sumLengthUnit === "char" ? process.env.REACT_APP_MAX_SUM_CHARS : process.env.REACT_APP_MAX_SUM_LINES}
                    style={{ width: "4rem"}}
                    onChange={handleSumLengthChange}
                />
                <label
                    className="flex items-center ml-2"
                >
                    <input
                        type="radio"
                        value="char"
                        checked={sumLengthUnit === 'char'}
                        onChange={handleSumLengthUnitChange}
                        className="mr-2"
                    />
                    chars
                </label>
                <label
                    className="flex items-center ml-2"
                >
                    <input
                        type="radio"
                        value="line"
                        checked={sumLengthUnit === 'line'}
                        onChange={handleSumLengthUnitChange}
                        className="mr-2"
                    />
                    sents
                </label>
            </div>
        </fieldset>
    );
};

export default SummaryLengthFieldset;
