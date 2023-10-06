import React from "react";

import HelpHeader from "./Header.jsx";
import HelpBody from "./Body.jsx";
import Footer from "../MainPage/Footer/Footer";
import Page from "../ui/Page";


const HelpPage = () => {
    return (
        <Page
            className="w-full h-full bg-gray-200"
        >
            <HelpHeader />
            <HelpBody />
            <Footer />
        </Page>
    );
};

export default HelpPage;
