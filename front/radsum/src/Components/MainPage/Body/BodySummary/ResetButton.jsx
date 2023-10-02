import React from "react";


const ResetButton = ({ setSort, setFilter, setShowedComp, setCurrentDropDownWithInputsId, setExcludedSents, className }) => {
    return (
        <button
            className={`
                bg-gray-700 px-2 py-1 rounded-md text-white hover:bg-gray-500 ${className}
            `}
            onClick={(e) => {
                setSort("documentOrder");
                setFilter(["salience", "content", "novelty", "posAbs", "posRel"]);
                setShowedComp(["salience", "content", "novelty", "posAbs", "posRel"]);
                setCurrentDropDownWithInputsId(null);
                setExcludedSents([]);
            }}
        >reset</button>
    );
};

export default ResetButton;
