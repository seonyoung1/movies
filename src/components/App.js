import React from 'react';
import GlobalStyled from "../assets/GlobalStyles";
import Router from "./Router";

const App = () => {
    return (
        <div className="wrapper">
            <Router />
            <GlobalStyled />
        </div>
    )
};

export default App;
