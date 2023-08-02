import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HelpPage from "./Components/HelpPage/HelpPage";
import AboutPage from "./Components/AboutPage/AboutPage";
import MainPage from "./Components/MainPage/MainPage";
import PageNotFound from "./Components/PageNotFound/PageNotFound";


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/helppage" element={<HelpPage/>}/>
        <Route exact path="/aboutpage" element={<AboutPage/>}/>

        <Route exact path="/" element={<MainPage/>}/>

        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
