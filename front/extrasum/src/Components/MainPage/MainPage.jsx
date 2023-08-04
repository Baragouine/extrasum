import React from "react";

import Page from "../ui/Page";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Body from "./Body/Body";


const MainPage = () => {
    return (
        <Page
            className="w-full h-full bg-gray-200"
        >
            <Header />
            <Body />
            <Footer />
        </Page>
    );
};

export default MainPage;
