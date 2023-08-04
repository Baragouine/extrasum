import React from "react";


const FilterComponent = ({ filter, setFilter }) => {
    return (
        <div>
            {
                ["salience", "content", "novelty", "posAbs", "posRel"].map((comp) => (
                    <div
                        key={comp}
                        className="whitespace-nowrap"
                    >
                        <label>
                            <input
                                type="checkbox"
                                checked={!!filter.find((e) => e === comp)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        let tmp = [...filter];

                                        tmp.push(comp);
                                        setFilter(tmp);
                                    } else  {
                                        setFilter(filter.filter((e) => e !== comp));
                                    }
                                }}
                            /> {comp}
                        </label>
                    </div>
                ))
            }
        </div>
    );
};

export default FilterComponent;
