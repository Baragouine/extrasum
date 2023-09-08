import React, { useEffect, useState } from "react";

import BodyText from "./BodyText/BodyText";
import BodySummary from "./BodySummary/BodySummary";
import SummaryServices from "../../../Services/SummaryServices";
import { formatText } from "../../../utils/formatText";


const Body = () => {
    const [text, setText] = useState("");
    const [isEditText, setIsEditText] = useState(true);
    const [sumInfo, setSumInfo] = useState([]);
    const [formattedSumInfo, setFormattedSumInfo] = useState([]);
    const [delimiter, setDelimiter] = useState("default");
    const [sumLengthUnit, setSumLengthUnit] = useState("line");
    const [sumLength, setSumLength] = useState(sumLengthUnit === "char" ? process.env.REACT_APP_DEF_SUMLEN_CHARS : process.env.REACT_APP_DEF_SUMLEN_LENS);
    const [excludedSents, setExcludedSents] = useState([]);
    const [sort, setSort] = useState("documentOrder");
    const [filter, setFilter] = useState(["salience", "content", "novelty", "posAbs", "posRel"]);
    const [showedComp, setShowedComp] = useState(["salience", "content", "novelty", "posAbs", "posRel"]);
    const [currentDropDownWithInputsIdLvl0, setCurrentDropDownWithInputsIdLvl0] = useState(null);

    const handleSummarize = async (text, delimiter) => {
        const result = await SummaryServices.summarize(null, text, delimiter);

        if (result[0] === 0) {
            setSumInfo(result[1]);
            setFormattedSumInfo(formatText(result[1], excludedSents, filter, sumLength, sumLengthUnit));
        }

        return result;
    };

    useEffect(() => {
        setExcludedSents([]);
    }, [isEditText, sumLength, sumLengthUnit]);

    useEffect(() => {
        if (!isEditText) {
            handleSummarize(text, delimiter);
        }
    }, [isEditText, delimiter]);

    useEffect(() => {
        if (!isEditText) {
            setFormattedSumInfo(formatText(sumInfo, excludedSents, filter, sumLength, sumLengthUnit));
        }
    }, [isEditText, sumLength, sumLengthUnit, excludedSents]);

    return (
        <div
            className="md:mx-8 min-h-screen"
        >
            <div
                className="hidden md:flex md:h-16 items-center"
            >
                Non-English documents give a random summary
            </div>
            <div
                className="w-full flex flex-col md:flex-row md:mb-4"
            >
                <BodyText
                    handleSummarize={handleSummarize}
                    delimiter={delimiter}
                    setDelimiter={setDelimiter}
                    sumLengthUnit={sumLengthUnit}
                    setSumLengthUnit={setSumLengthUnit}
                    sumLength={sumLength}
                    setSumLength={setSumLength}
                    formattedSumInfo={formattedSumInfo}
                    text={text}
                    setText={setText}
                    isEditText={isEditText}
                    setIsEditText={setIsEditText}
                    excludedSents={excludedSents}
                    currentDropDownWithInputsIdLvl0={currentDropDownWithInputsIdLvl0}
                    setCurrentDropDownWithInputsIdLvl0={setCurrentDropDownWithInputsIdLvl0}
                />
                <div
                    className="md:border-r border-gray-300 border-t md:border-t-0 h-full"
                >
                </div>
                <BodySummary
                    isEditText={isEditText}
                    formattedSumInfo={formattedSumInfo}
                    excludedSents={excludedSents}
                    setExcludedSents={setExcludedSents}
                    filter={filter}
                    setFilter={setFilter}
                    showedComp={showedComp}
                    setShowedComp={setShowedComp}
                    sort={sort}
                    setSort={setSort}
                    currentDropDownWithInputsIdLvl0={currentDropDownWithInputsIdLvl0}
                    setCurrentDropDownWithInputsIdLvl0={setCurrentDropDownWithInputsIdLvl0}
                />
            </div>
        </div>
    );
};

export default Body;