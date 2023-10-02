import React from "react";


const ShowComponent = ({ showedComp, setShowedComp }) => {
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
                                checked={!!showedComp.find((e) => e === comp)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        let tmp = [...showedComp];

                                        tmp.push(comp);
                                        setShowedComp(tmp);
                                    } else  {
                                        setShowedComp(showedComp.filter((e) => e !== comp));
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

export default ShowComponent;