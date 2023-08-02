import React from "react";

import Page from "../ui/Page";
import Header from "./Header/Header";


const MainPage = () => {
    return (
        <Page
            className="w-screen h-screen bg-gray-100"
        >
            <Header></Header>
        </Page>
    );
};

export default MainPage;
