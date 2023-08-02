import React from "react";


const Page = ({ children, className }) => {
    return (
        <div
            className={className}
        >
            { children }
        </div>
    );
};

export default Page;
