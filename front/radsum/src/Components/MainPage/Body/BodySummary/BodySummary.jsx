import React, { useRef, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import { MdOutlineContentCopy } from "react-icons/md";

import DropDownWithInputs from "../../../ui/DropDownWithInputs";
import SortComponent from "./SortComponent";
import FilterComponent from "./FilterComponent";
import ShowComponent from "./ShowComponent";
import ResetButton from "./ResetButton";
import { isExcludedSent } from "../../../../utils/formatText";


const BodySummary = ({ isEditText, formattedSumInfo, excludedSents, setExcludedSents, filter, setFilter, showedComp, setShowedComp, sort, setSort, currentDropDownWithInputsIdLvl0, setCurrentDropDownWithInputsIdLvl0 }) => {
    const [currentDropDownWithInputsId, setCurrentDropDownWithInputsId] = useState(null);
    const msgSumarryCopiedRef = useRef(null);
    const [showMsgSumarryCopied, setShowMsgSumarryCopied] = useState(false);
    const [timeLastShowMsgSummaryCopied, setTimeLastShowMsgSummaryCopied] = useState(0);

    const includeSent = (index) => {
        setExcludedSents(excludedSents.filter((id) => id !== index));
    };

    const excludeSent = (index) => {
        let tmp = [...excludedSents]
        tmp.push(index);
        setExcludedSents(tmp);
    };

    const handleSortChange = (event) => {
        setSort(event.target.value);
    };

    const sortSent = (sents) => {
        let result = [...sents];

        result.sort((a, b) => {
            if (sort === "documentOrder")
                return a.index - b.index;

            return filter.reduce((acc, curr) => acc + b[curr], 0)-filter.reduce((acc, curr) => acc + a[curr], 0);
        })

        return result;
    };

    const formatProba = (p) => {
        let result = "" + p;

        if (result.substring(0,2) === "0.")
            return result.substring(1, result.length);

        return result;
    };

    const handleCopy = () => {
        let summary = sortSent(formattedSumInfo.filter((sentInfo) => !!sentInfo.dominantComponent && sentInfo.dominantComponent !== "excluded")).reduce((acc, curr) => acc + (acc.length > 0 ? " " : "") + curr.sentence, "");

        navigator.clipboard.writeText(summary).then(() => {
            setShowMsgSumarryCopied(false);
            setTimeLastShowMsgSummaryCopied(Date.now());
            setTimeout(() => {
                setShowMsgSumarryCopied(true);
                setTimeout(() => {
                    if ((Date.now() - timeLastShowMsgSummaryCopied) > 9000)
                        setShowMsgSumarryCopied(false);
                }, 10000);
            }, 200);
        }).catch(err => {
            console.error("Erreur lors de la copie : ", err);
        });
    };

    const sigmoid = (x) => 1.0 / (1.0 + Math.exp(-x));

    return (
        <div
            className={`
                bg-white
                md:max-w-[50%]
                w-full
                md:rounded-br-lg
                md:rounded-tr-lg
            `}
            onResize={(e) => setCurrentDropDownWithInputsId(null)}
        >
            <div
                className={`
                    flex flex-row items-center justify-between mx-4 h-10 lg:h-20
                `}
            >
                <div
                    className="font-bold text-xl"
                >Summary</div>
                <div
                    className="hidden lg:flex lg:flex-row"
                >
                    {!isEditText &&
                        <div
                            className="flex flex-row z-40"
                        >
                            <div>
                                <DropDownWithInputs
                                    id="sort"
                                    isMenu={true}
                                    text={"sort"}
                                    currentDropDownWithInputsId={currentDropDownWithInputsId}
                                    setCurrentDropDownWithInputsId={setCurrentDropDownWithInputsId}
                                >
                                    <SortComponent
                                        sort={sort}
                                        handleSortChange={handleSortChange}
                                    />
                                </DropDownWithInputs>
                            </div>
                            <div
                                className="ml-4"
                            >
                                <DropDownWithInputs
                                    id="filter"
                                    isMenu={true}
                                    text={"filter"}
                                    currentDropDownWithInputsId={currentDropDownWithInputsId}
                                    setCurrentDropDownWithInputsId={setCurrentDropDownWithInputsId}
                                >
                                    <FilterComponent
                                        filter={filter}
                                        setFilter={setFilter}
                                    />
                                </DropDownWithInputs>
                            </div>
                            <div
                                className="ml-4"
                            >
                                <DropDownWithInputs
                                    id="show"
                                    isMenu={true}
                                    text={"show"}
                                    currentDropDownWithInputsId={currentDropDownWithInputsId}
                                    setCurrentDropDownWithInputsId={setCurrentDropDownWithInputsId}
                                >
                                    <ShowComponent
                                        showedComp={showedComp}
                                        setShowedComp={setShowedComp}
                                    />
                                </DropDownWithInputs>
                            </div>
                            <div
                                className="ml-4"
                            >
                                <ResetButton
                                    setSort={setSort}
                                    setFilter={setFilter}
                                    setShowedComp={setShowedComp}
                                    setCurrentDropDownWithInputsId={setCurrentDropDownWithInputsId}
                                    setExcludedSents={setExcludedSents}
                                />
                            </div>
                        </div>
                    }
                </div>
                <div
                    className="lg:hidden z-10"
                >
                    {!isEditText &&
                        <DropDownWithInputs
                            id="summaryOptions"
                            title="options"
                            handleClose={() => setCurrentDropDownWithInputsId(null)}
                            currentDropDownWithInputsId={currentDropDownWithInputsIdLvl0}
                            setCurrentDropDownWithInputsId={setCurrentDropDownWithInputsIdLvl0}
                        >
                            <div>
                                <DropDownWithInputs
                                    id="sort"
                                    isMenu={true}
                                    text={"sort"}
                                    direction={"left"}
                                    currentDropDownWithInputsId={currentDropDownWithInputsId}
                                    setCurrentDropDownWithInputsId={setCurrentDropDownWithInputsId}
                                >
                                    <SortComponent
                                        sort={sort}
                                        handleSortChange={handleSortChange}
                                    />
                                </DropDownWithInputs>
                            </div>
                            <div
                                className="mt-2"
                            >
                                <DropDownWithInputs
                                    id="filter"
                                    isMenu={true}
                                    text={"filter"}
                                    direction={"left"}
                                    currentDropDownWithInputsId={currentDropDownWithInputsId}
                                    setCurrentDropDownWithInputsId={setCurrentDropDownWithInputsId}
                                >
                                    <FilterComponent
                                        filter={filter}
                                        setFilter={setFilter}
                                    />
                                </DropDownWithInputs>
                            </div>
                            <div
                                className="mt-2"
                            >
                                <DropDownWithInputs
                                    id="show"
                                    isMenu={true}
                                    text={"show"}
                                    direction={"left"}
                                    currentDropDownWithInputsId={currentDropDownWithInputsId}
                                    setCurrentDropDownWithInputsId={setCurrentDropDownWithInputsId}
                                >
                                    <ShowComponent
                                        showedComp={showedComp}
                                        setShowedComp={setShowedComp}
                                    />
                                </DropDownWithInputs>
                            </div>
                            <div
                                className="mt-2"
                            >
                                <ResetButton
                                    className={"w-full"}
                                    setSort={setSort}
                                    setFilter={setFilter}
                                    setShowedComp={setShowedComp}
                                    setCurrentDropDownWithInputsId={setCurrentDropDownWithInputsId}
                                    setExcludedSents={setExcludedSents}
                                />
                            </div>
                        </DropDownWithInputs>
                    }
                </div>
            </div>
            <div
                className={`
                    border-t border-gray-300 w-full flex flex-col justify-center items-center
                `}
            >
                {!isEditText && <div
                    className="px-2 w-full"
                >
                    <div
                        className="max-h-64 md:max-h-none overflow-auto text-base pb-5"
                    >
                        <table
                            className="w-full border-r border-gray-300"
                        >
                            <thead>
                                <tr>
                                    <td></td>
                                    <td
                                        className="w-full"
                                    ></td>
                                    <td></td>
                                    <th
                                        className={`
                                            relative text-xs h-12 min-w-[1.45rem] max-w-[1.45rem] justify-center text-center
                                            bg-yellow-100
                                        `}
                                        rowSpan={2}
                                    >
                                        <div
                                            className="flex w-full h-full justify-center text-center items-center italic font-bold"
                                        >P</div>
                                        <div
                                            className="absolute bottom-0 w-full z-20 border-b border-gray-300"
                                        ></div>
                                        <div
                                            className="absolute z-20 w-full h-full border-l border-gray-300 bottom-0"
                                        ></div>
                                        <div
                                            className="absolute z-30 w-full h-full border-r border-gray-500 bottom-0 left-px"
                                        ></div>
                                    </th>
                                    {
                                        showedComp.length > 0 && <td
                                            colSpan={showedComp.length}
                                            className="font-bold text-center border-b border-x border-gray-300 bg-gray-200"
                                        >
                                            features
                                        </td>
                                    }
                                </tr>
                                <tr>
                                    <td></td>
                                    <td
                                        className="w-full"
                                    ></td>
                                    <td></td>
                                    {
                                        showedComp.map((c) => (
                                            <td
                                                key={c}
                                                className={`
                                                    relative border-l border-gray-300 text-xs h-12 min-w-[1.45rem] max-w-[1.45rem]
                                                    ${c === "salience" ? " bg-red-100 " : ""}
                                                    ${c === "content"  ? " bg-orange-100 " : ""}
                                                    ${c === "novelty" ? " bg-lime-100 " : ""}
                                                    ${c === "posAbs" ? " bg-teal-100 " : ""}
                                                    ${c === "posRel" ? " bg-indigo-100 " : ""}
                                                `}
                                            >
                                                <div
                                                    className={`
                                                        absolute rotate-90 flex text-center
                                                        ${c === "salience" ? " top-[1rem] right-[-0.6rem] " : ""}
                                                        ${c === "content"  ? " top-[0.98rem] right-[-0.6rem] " : ""}
                                                        ${c === "novelty" ? " top-[0.97rem] right-[-0.55rem] " : ""}
                                                        ${c === "posAbs" ? " top-[1rem] right-[-0.6rem] " : ""}
                                                        ${c === "posRel" ? " top-[0.97rem] right-[-0.45rem] " : ""}
                                                    `}
                                                >{c}</div>
                                                <div
                                                    className={`
                                                        absolute z-20 bottom-0 left-px w-full h-full border-b border-r border-gray-300
                                                    `}
                                                ></div>
                                                <div
                                                    className={`
                                                        absolute z-20 -top-px left-px w-full h-full border-r border-gray-300
                                                    `}
                                                ></div>
                                            </td>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    sortSent(formattedSumInfo.filter((sentInfo) => !!sentInfo.dominantComponent)).map((sentInfo, index) => (
                                        <tr
                                            key={index}
                                        >
                                            <td
                                                className={`
                                                    align-top text-right border-t border-b border-gray-300
                                                    ${sentInfo.dominantComponent === "salience" ? " bg-red-100 " : ""}
                                                    ${sentInfo.dominantComponent === "content"  ? " bg-orange-100 " : ""}
                                                    ${sentInfo.dominantComponent === "novelty" ? " bg-lime-100 " : ""}
                                                    ${sentInfo.dominantComponent === "posAbs" ? " bg-teal-100 " : ""}
                                                    ${sentInfo.dominantComponent === "posRel" ? " bg-indigo-100 " : ""}
                                                    ${sentInfo.dominantComponent === "many" ? " bg-yellow-100 " : ""}
                                                `}
                                            >
                                                <div
                                                    className="px-2"
                                                >{sentInfo.index + 1}</div>
                                            </td>
                                            <td
                                                className={`
                                                    w-full ${isExcludedSent(excludedSents, sentInfo.index) ? " line-through " : ""}
                                                    ${sentInfo.dominantComponent === "salience" ? " bg-red-100 " : ""}
                                                    ${sentInfo.dominantComponent === "content"  ? " bg-orange-100 " : ""}
                                                    ${sentInfo.dominantComponent === "novelty" ? " bg-lime-100 " : ""}
                                                    ${sentInfo.dominantComponent === "posAbs" ? " bg-teal-100 " : ""}
                                                    ${sentInfo.dominantComponent === "posRel" ? " bg-indigo-100 " : ""}
                                                    ${sentInfo.dominantComponent === "many" ? " bg-yellow-100 " : ""}
                                                    border-y border-gray-300
                                                `}
                                            >
                                                {sentInfo.sentence}
                                            </td>
                                            <td
                                                className={`
                                                    cursor-pointer border-l border-gray-300
                                                    ${sentInfo.dominantComponent === "salience" ? " bg-red-100 " : ""}
                                                    ${sentInfo.dominantComponent === "content"  ? " bg-orange-100 " : ""}
                                                    ${sentInfo.dominantComponent === "novelty" ? " bg-lime-100 " : ""}
                                                    ${sentInfo.dominantComponent === "posAbs" ? " bg-teal-100 " : ""}
                                                    ${sentInfo.dominantComponent === "posRel" ? " bg-indigo-100 " : ""}
                                                    ${sentInfo.dominantComponent === "many" ? " bg-yellow-100 " : ""}
                                                    border-y border-gray-300
                                                `}
                                            >
                                                {!isExcludedSent(excludedSents, sentInfo.index) &&
                                                    <BsTrash
                                                        className="text-base"
                                                        onClick={(e) => excludeSent(sentInfo.index)}
                                                    />
                                                }
                                                {isExcludedSent(excludedSents, sentInfo.index) &&
                                                    <GrAdd
                                                        className="text-base"
                                                        onClick={(e) => includeSent(sentInfo.index)}
                                                    />
                                                }
                                            </td>
                                            <td
                                                className={`
                                                    text-xs text-center relative
                                                `}
                                                title={"" + (sigmoid(filter.reduce((acc, curr) => acc + sentInfo[curr], 0)))}
                                            >
                                                <div
                                                    className="absolute flex bottom-0 items-center text-center justify-center z-10 w-full h-full border-r border-gray-500"
                                                >{formatProba(Number((sigmoid(filter.reduce((acc, curr) => acc + sentInfo[curr], 0))).toFixed(2)))}</div>
                                                <div
                                                    className={`
                                                        w-full absolute z-0 bottom-0
                                                        bg-yellow-100
                                                    `}
                                                    style={{height : (100 * Number((sigmoid(filter.reduce((acc, curr) => acc + sentInfo[curr], 0))).toFixed(2))) + "%"}}
                                                >
                                                </div>
                                                <div
                                                    className="absolute bottom-0 w-full z-20 border-b border-gray-300"
                                                ></div>
                                                <div
                                                    className="absolute z-20 w-full h-full border-l border-gray-300 bottom-0"
                                                ></div>
                                            </td>
                                            {
                                                showedComp.map((c) => (
                                                    <td
                                                        key={c}
                                                        className="border-l border-gray-300 text-xs text-center min-w-[1.45rem] max-w-[1.45rem] relative"
                                                        title={"" + sentInfo[c]}
                                                    >
                                                        <div
                                                            className="absolute flex items-center text-center justify-center z-10 w-full h-full bottom-0"
                                                        >{formatProba(Number((sigmoid(sentInfo[c])).toFixed(2)))}</div>
                                                        <div
                                                            className={`
                                                                w-full absolute z-0 bottom-px
                                                                ${c === "salience" ? " bg-red-100 " : ""}
                                                                ${c === "content"  ? " bg-orange-100 " : ""}
                                                                ${c === "novelty" ? " bg-lime-100 " : ""}
                                                                ${c === "posAbs" ? " bg-teal-100 " : ""}
                                                                ${c === "posRel" ? " bg-indigo-100 " : ""}
                                                            `}
                                                            style={{height : (100 * Number((sigmoid(sentInfo[c])).toFixed(2))) + "%"}}
                                                        ></div>
                                                        <div
                                                            className={`
                                                                absolute z-20 bottom-0 left-px w-full h-full border-b border-r border-gray-300
                                                            `}
                                                        ></div>
                                                        <div
                                                            className={`
                                                                absolute z-20 -top-px left-px w-full h-full border-r border-gray-300
                                                            `}
                                                        ></div>
                                                    </td>
                                                ))
                                            }
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
                            className="relative ml-2"
                        >
                            {showMsgSumarryCopied &&
                                <div
                                    ref={msgSumarryCopiedRef}
                                    className="absolute left-[-0.25rem] bottom-[2rem] "
                                >
                                    <div
                                        className="whitespace-nowrap text-sm border border-gray-300 bg-green-100 px-2 py-1"
                                        tabIndex={0}
                                    >
                                        The summary has been successfully copied.
                                    </div>
                                    <div
                                        className="relative"
                                    >
                                        <div
                                            className="absolute bg-green-100 h-2 w-2 rotate-45 left-[0.5rem] top-[-0.28rem] border-r border-b border-gray-300"
                                        >
                                        </div>
                                    </div>
                                </div>
                            }
                            <div>
                                <MdOutlineContentCopy
                                    className="text-xl cursor-pointer"
                                    title="copy summary"
                                    onClick={(e) => handleCopy()}
                                />
                            </div>
                        </div>
                        <div
                            className="w-full text-right mr-2"
                        >
                            {
                                ["salience", "content", "novelty", "posAbs", "posRel", "many"].map((name) => (
                                    <div
                                        className="inline-flex items-center"
                                        key={name}
                                    >
                                        <div
                                            className={`
                                                ${name === "salience" ? " bg-red-100 " : ""}
                                                ${name === "content"  ? " bg-orange-100 " : ""}
                                                ${name === "novelty" ? " bg-lime-100 " : ""}
                                                ${name === "posAbs" ? " bg-teal-100 " : ""}
                                                ${name === "posRel" ? " bg-indigo-100 " : ""}
                                                ${name === "many" ? " bg-yellow-100 " : ""}
                                                h-3 w-3 sm:w-4 sm:h-4
                                                border border-gray-600
                                                ml-2
                                            `}
                                        ></div>
                                        <div
                                            className="ml-0.5 text-xs sm:text-base"
                                        >
                                            {name}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    );
};

export default BodySummary;
