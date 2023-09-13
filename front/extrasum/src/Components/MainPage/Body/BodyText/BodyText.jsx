import React, { useEffect, useRef } from "react";

import DropDownWithInputs from "../../../ui/DropDownWithInputs";
import DelimiterFieldset from "./DelimiterFieldset";
import SummaryLengthFieldset from "./SummaryLengthFieldset";
import { isExcludedSent } from "../../../../utils/formatText";


const BodyText = ({ handleSummarize, delimiter, setDelimiter, sumLengthUnit, setSumLengthUnit, sumLength, setSumLength, formattedSumInfo, text, setText, isEditText, setIsEditText, excludedSents, currentDropDownWithInputsIdLvl0, setCurrentDropDownWithInputsIdLvl0 }) => {
    const inputForTextRef = useRef(null);

    const handleDelimiterChange = (event) => {
        setDelimiter(event.target.value);
    };

    const handleSumLengthUnitChange = (event) => {
        setSumLengthUnit(event.target.value);
    };

    const handleSumLengthChange = (event) => {
        setSumLength(event.target.value);
    };

    const focusTextArea = () => {
        if (inputForTextRef.current) {
            inputForTextRef.current.focus();
            inputForTextRef.current.setSelectionRange(inputForTextRef.current.value.length, inputForTextRef.current.value.length);
        }
    };

    const updateTextLocally = (t) => {
        //  TODO
        setText(t);
        return;

        let ids = ["textLen1", "textLen2"];

        ids.forEach((id) => {
            if (!!document.getElementById(id)) {
                document.getElementById(id).innerHTML = t.length === 0 ? "" : t.length + " chars";
            }
        });

        ids = ["btnSummarize1", "btnSummarize2", "btnClear1", "btnClear2"];

        ids.forEach((id) => {
            if (!!document.getElementById(id)) {
                document.getElementById(id).style.backgroundColor = t.length > 0 ? 'rgb(55, 65, 81)' : "rgb(209, 213, 219)";
                document.getElementById(id).style.color = t.length > 0 ? "#ffffff" : 'rgb(55, 65, 81)';
                document.getElementById(id).style.cursor = t.length > 0 ? "pointer" : 'auto';
            }
        });
    };

    const handleSummarizeClicked = async (e) => {
        if (inputForTextRef?.current) {
            const t = inputForTextRef.current.value;

            setText(t);

            if (t.length > 0) {
                const result = await handleSummarize(t, delimiter);

                if (result[0] === 0) {
                    setIsEditText(false);
                }
            }
        }
    };

    const handleEditClicked = async (e) => {
        if (inputForTextRef?.current) {
            setIsEditText(true); focusTextArea();
        }
    };

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
                bg-white
                md:max-w-[50%]
                w-full
                md:rounded-tl-lg
                md:rounded-bl-lg
            `}
        >
            <div
                className={`
                    flex flex-row items-center justify-between mx-4 h-10 lg:h-20
                `}
            >
                <div
                    className="font-bold text-xl"
                >Text</div>
                <div
                    className="hidden lg:flex lg:flex-row"
                >
                    <DelimiterFieldset
                        delimiter={delimiter}
                        handleDelimiterChange={handleDelimiterChange}
                    />
                    <SummaryLengthFieldset
                        handleSumLengthUnitChange={handleSumLengthUnitChange}
                        sumLengthUnit={sumLengthUnit}
                        sumLength={sumLength}
                        handleSumLengthChange={handleSumLengthChange}
                    />
                </div>
                <div
                    className="lg:hidden"
                >
                    <DropDownWithInputs
                        id="textOptions"
                        title="options"
                        currentDropDownWithInputsId={currentDropDownWithInputsIdLvl0}
                        setCurrentDropDownWithInputsId={setCurrentDropDownWithInputsIdLvl0}
                    >
                        <DelimiterFieldset
                            delimiter={delimiter}
                            handleDelimiterChange={handleDelimiterChange}
                        />
                        <SummaryLengthFieldset
                            handleSumLengthUnitChange={handleSumLengthUnitChange}
                            sumLengthUnit={sumLengthUnit}
                            sumLength={sumLength}
                            handleSumLengthChange={handleSumLengthChange}
                        />
                    </DropDownWithInputs>
                </div>
                <div
                    className="hidden lg:flex lg:flex-row"
                ></div>
            </div>
            <div
                className={`
                    hidden md:flex 
                    border-t border-gray-300 w-full flex-col justify-center items-center
                `}
            >
                {isEditText && <div
                    className="mt-2 mb-1 px-2 w-full flex flex-col justify-center items-center"
                >
                    <div
                        className="w-full mb-2 mt-1 py-1 flex justify-between items-center"
                    >
                        <div
                            className="ml-2"
                        >
                            <button
                                id="btnSummarize1"
                                className={text.length > 0 ?
                                    "bg-gray-700 px-2 py-1 rounded-md text-white hover:bg-gray-500" :
                                    "bg-gray-300 px-2 py-1 rounded-md text-gray-700 cursor-auto"}
                                onClick={handleSummarizeClicked}
                            >summarize</button>
                            <button
                                id="btnClear1"
                                className={`${text.length > 0 ?
                                    "bg-gray-700 px-2 py-1 rounded-md text-white hover:bg-gray-500" :
                                    "bg-gray-300 px-2 py-1 rounded-md text-gray-700 cursor-auto"}
                                    ml-4
                                `}
                                onClick={(e) => { setText(""); setIsEditText(true); focusTextArea(); }}
                            >clear</button>
                        </div>
                        <div
                            id="textLen1"
                        >
                        </div>
                    </div>
                </div>
                }
                {!isEditText && <div
                    className="mt-2 mb-1 px-2 w-full"
                >
                    <div
                        className="w-full mb-2 mt-2 py-1 flex justify-between items-center"
                    >
                        <div
                            className="ml-2"
                        >
                            <button
                                className={text.length > 0 ?
                                    "bg-gray-700 px-2 py-1 rounded-md text-white hover:bg-gray-500" :
                                    "bg-gray-300 px-2 py-1 rounded-md text-gray-700 cursor-auto"
                                }
                                onClick={handleEditClicked}
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
                            <div>{formattedSumInfo.length} line(s)</div>
                            <div
                                className="ml-4"
                            >
                                {text.length} char(s)
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
            <div
                className={`
                    w-full flex flex-col justify-center items-center
                `}
            >
                <div
                    className={`
                        mt-2 md:mt-0 px-2 w-full
                        ${isEditText ? " flex " : " hidden "}
                        flex-col justify-center items-center
                    `}
                >
                    <textarea
                        ref={inputForTextRef}
                        className="w-full resize-none max-h-64 md:max-h-none text-base p-1"
                        placeholder="Enter your text here"
                        onChange={(e) => updateTextLocally(e.target.value)}
                    />
                    <div
                        className="w-full mb-2 mt-1 py-1 flex justify-between items-center"
                    >
                        <div
                            className="ml-2"
                        >
                            <button
                                id="btnSummarize2"
                                className={text.length > 0 ?
                                    "bg-gray-700 px-2 py-1 rounded-md text-white hover:bg-gray-500" :
                                    "bg-gray-300 px-2 py-1 rounded-md text-gray-700 cursor-auto"
                                }
                                onClick={handleSummarizeClicked}
                            >summarize</button>
                            <button
                                id="btnClear2"
                                className={`${text.length > 0 ?
                                    "bg-gray-700 px-2 py-1 rounded-md text-white hover:bg-gray-500" :
                                    "bg-gray-300 px-2 py-1 rounded-md text-gray-700 cursor-auto"}
                                    ml-4
                                `}
                                onClick={(e) => { setText(""); setIsEditText(true); focusTextArea(); }}
                            >clear</button>
                        </div>
                        <div
                            id="textLen2"
                        >
                        </div>
                    </div>
                </div>
                {!isEditText && <div
                    className="mt-2 px-2 w-full"
                >
                    <div
                        className="max-h-64 md:max-h-none overflow-auto text-base pb-5"
                        style={{minHeight: "256px"}}
                    >
                        <table
                            className="w-full"
                        >
                            <tbody>
                                {
                                    formattedSumInfo.map((sentInfo, index) => (
                                        <tr
                                            className={`
                                                ${sentInfo.dominantComponent === "salience" ? " bg-red-100 " : ""}
                                                ${sentInfo.dominantComponent === "content"  ? " bg-orange-100 " : ""}
                                                ${sentInfo.dominantComponent === "novelty" ? " bg-lime-100 " : ""}
                                                ${sentInfo.dominantComponent === "posAbs" ? " bg-teal-100 " : ""}
                                                ${sentInfo.dominantComponent === "posRel" ? " bg-indigo-100 " : ""}
                                                ${sentInfo.dominantComponent === "many" ? " bg-yellow-100 " : ""}
                                                ${index > 0 ? " border-t border-gray-300 " : ""}
                                            `}
                                            key={index}
                                        >
                                            <td
                                                className="align-top text-right"
                                            >
                                                <div
                                                    className="px-2"
                                                >{index + 1}</div>
                                            </td>
                                            <td
                                                className={`w-full ${isExcludedSent(excludedSents, sentInfo.index) ? " line-through " : ""}`}
                                            >
                                                {sentInfo.sentence}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div
                        className="w-full mb-2 mt-2 py-1 flex justify-between items-center"
                    >
                        <div
                            className="ml-2"
                        >
                            <button
                                className={text.length > 0 ?
                                    "bg-gray-700 px-2 py-1 rounded-md text-white hover:bg-gray-500" :
                                    "bg-gray-300 px-2 py-1 rounded-md text-gray-700 cursor-auto"
                                }
                                onClick={handleEditClicked}
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
                            <div>{formattedSumInfo.length} line(s)</div>
                            <div
                                className="ml-4"
                            >
                                {text.length} char(s)
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