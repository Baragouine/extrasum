import React from "react";


const BodySummary = () => {
    return (
        <div
            className={`
                w-full bg-red-400
                md:rounded-br-lg
                md:rounded-tr-lg
            `}
        >
            <div
                className={`
                    flex flex-row items-center justify-between mx-2 h-10 lg:h-20
                `}
            >
                <div
                    className="font-bold text-xl"
                >Summary</div>
            </div>
        </div>
    );
};

export default BodySummary;
