import React, { useState } from "react";

import BodyText from "./BodyText/BodyText";
import BodySummary from "./BodySummary/BodySummary";
import SummaryServices from "../../../Services/SummaryServices";
import { formatText } from "../../../utils/formatText";


const Body = () => {
    const [sumInfo, setSumInfo] = useState([]);
    const [formattedSumInfo, setFormattedSumInfo] = useState([]);
    const [delimiter, setDelimiter] = useState("default");
    const [sumLengthUnit, setSumLengthUnit] = useState("line");
    const [sumLength, setSumLength] = useState(sumLengthUnit === "char" ? process.env.REACT_APP_DEF_SUMLEN_CHARS : process.env.REACT_APP_DEF_SUMLEN_LENS);
    const [excludedSents, setExcludedSents] = useState([]);
    const [filter, setFilter] = useState(["salience", "content", "novelty", "posAbs", "posRel"]);

    const handleSummarize = async (text, delimiter) => {
        const result = await SummaryServices.summarize(text, delimiter);

        if (result[0] === 0) {
            setSumInfo(result[1]);
            setFormattedSumInfo(formatText(result[1], excludedSents, filter, sumLength, sumLengthUnit));
        }

        return result;
    };

    return (
        <div
            className="md:mx-8"
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
                />
                <BodySummary
                    formattedSumInfo={formattedSumInfo}
                />
            </div>
        </div>
    );
};

export default Body;