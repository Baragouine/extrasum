import React from "react";


const SortComponent = ({ sort, handleSortChange }) => {

    return (
        <div>
            <label
                className="flex items-center ml-2 whitespace-nowrap"
            >
                <input
                    type="radio"
                    value="documentOrder"
                    checked={sort === 'documentOrder'}
                    onChange={handleSortChange}
                    className="mr-2"
                />
                document order
            </label>
            <label
                className="flex items-center ml-2 whitespace-nowrap"
            >
                <input
                    type="radio"
                    value="probaDesc"
                    checked={sort === 'probaDesc'}
                    onChange={handleSortChange}
                    className="mr-2"
                />
                desc probability
            </label>
        </div>
    );
};

export default SortComponent;
