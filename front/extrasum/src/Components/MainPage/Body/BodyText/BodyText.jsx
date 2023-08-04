import React, { useEffect, useRef, useState } from "react";

import DropDownWithInputs from "../../../ui/DropDownWithInputs";


const BodyText = ({ handleSummarize, delimiter, setDelimiter, sumLengthUnit, setSumLengthUnit, sumLength, setSumLength, formattedSumInfo, text, setText, isEditText, setIsEditText }) => {
    const handleDelimiterChange = (event) => {
        setDelimiter(event.target.value);
    };

    const handleSumLengthUnitChange = (event) => {
        setSumLengthUnit(event.target.value);
    };

    const handleSumLengthChange = (event) => {
        setSumLength(event.target.value);
    };

    const handleSummarizeClicked = async (e) => {
        if (text.length > 0) {
            const result = await handleSummarize(text, delimiter);

            if (result[0] === 0) {
                setIsEditText(false);
            }
        }
    };

    const focusTextArea = () => {
        if (inputForTextRef.current) {
            inputForTextRef.current.focus();
            inputForTextRef.current.setSelectionRange(inputForTextRef.current.value.length, inputForTextRef.current.value.length);
        }
    };

    const inputForTextRef = useRef(null);

    useEffect(() => {
        if (inputForTextRef.current) {
            inputForTextRef.current.style.height = 'auto';
            inputForTextRef.current.style.height = Math.max(inputForTextRef.current.scrollHeight, 256) + "px";
        }
        focusTextArea();
    }, [text, isEditText])

    return (
        <div
            className={`
                w-full bg-blue-300
                md:rounded-tl-lg
                md:rounded-bl-lg
            `}
        >
            <div
                className={`
                    flex flex-row items-center justify-between mx-2 h-10 lg:h-20
                `}
            >
                <div
                    className="font-bold text-xl"
                >Text</div>
                <div
                    className="hidden lg:flex lg:flex-row"
                >
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
                                lines
                            </label>
                        </div>
                    </fieldset>
                </div>
                <div
                    className="lg:hidden"
                >
                    <DropDownWithInputs
                        title="options"
                    >
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
                        <fieldset
                            className="border border-gray-300 rounded-md p-1"
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
                                    lines
                                </label>
                            </div>
                        </fieldset>
                    </DropDownWithInputs>
                </div>
                <div
                    className="hidden lg:flex lg:flex-row"
                ></div>
            </div>
            <div
                className={`
                    border-t border-gray-300 w-full flex flex-col justify-center items-center
                `}
            >
                {isEditText && <div
                    className="mt-2 px-2 w-full flex flex-col justify-center items-center"
                >
                    <textarea
                        ref={inputForTextRef}
                        className="w-full resize-none max-h-64 lg:max-h-none text-md"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <div
                        className="w-full mb-1 mt-1 py-1 flex justify-between items-center"
                    >
                        <div>
                            <button
                                className={text.length > 0 ?
                                    "bg-gray-700 px-2 py-1 rounded-md text-white hover:bg-gray-500" :
                                    "bg-gray-300 px-2 py-1 rounded-md text-gray-700 cursor-auto"
                                }
                                onClick={handleSummarizeClicked}
                            >summarize</button>
                            <button
                                className={`${text.length > 0 ?
                                    "bg-gray-700 px-2 py-1 rounded-md text-white hover:bg-gray-500" :
                                    "bg-gray-300 px-2 py-1 rounded-md text-gray-700 cursor-auto"}
                                    ml-4
                                `}
                                onClick={(e) => { setText(""); setIsEditText(true); focusTextArea(); }}
                            >clear</button>
                        </div>
                        <div>
                            {text.length} chars
                        </div>
                    </div>
                </div>
                }
                {!isEditText && <div
                    className="mt-2 px-2 w-full"
                >
                    <div
                        className="max-h-64 lg:max-h-none overflow-y-auto text-md"
                        style={{ minHeight: "256px"}}
                    >
                        <table>
                            <tbody>
                                {
                                    formattedSumInfo.map((sentInfo, index) => (
                                        <tr
                                            className={`
                                                ${sentInfo.dominantComponent === "salience" ? " bg-red-200 " : ""}
                                                ${sentInfo.dominantComponent === "content"  ? " bg-orange-300 " : ""}
                                                ${sentInfo.dominantComponent === "novelty" ? " bg-lime-300 " : ""}
                                                ${sentInfo.dominantComponent === "posAbs" ? " bg-teal-200 " : ""}
                                                ${sentInfo.dominantComponent === "posRel" ? " bg-indigo-200 " : ""}
                                                ${sentInfo.dominantComponent === "many" ? " bg-yellow-200 " : ""}
                                                ${index > 0 ? " border-t border-gray-300 " : ""}
                                            `}
                                            key={index}
                                        >
                                            <td
                                                className="align-top"
                                            >
                                                <div
                                                    className="px-2"
                                                >{index + 1}</div>
                                            </td>
                                            <td>{sentInfo.sentence}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div
                        className="w-full mb-1 mt-1 py-1 flex justify-between items-center"
                    >
                        <div>
                            <button
                                className={text.length > 0 ?
                                    "bg-gray-700 px-2 py-1 rounded-md text-white hover:bg-gray-500" :
                                    "bg-gray-300 px-2 py-1 rounded-md text-gray-700 cursor-auto"
                                }
                                onClick={(e) => { setIsEditText(true); focusTextArea(); }}
                            >edit</button>
                            <button
                                className={`${text.length > 0 ?
                                    "bg-gray-700 px-2 py-1 rounded-md text-white hover:bg-gray-500" :
                                    "bg-gray-300 px-2 py-1 rounded-md text-gray-700 cursor-auto"}
                                    ml-4
                                `}
                                onClick={(e) => { setText(""); setIsEditText(true); focusTextArea(); }}
                            >clear</button>
                        </div>
                        <div
                            className="flex flex-row"
                        >
                            <div>{formattedSumInfo.length} lines</div>
                            <div
                                className="ml-4"
                            >
                                {text.length} chars
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    );
};

export default BodyText;