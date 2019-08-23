import React from 'react';
import GlobalStyled from "../assets/GlobalStyles";
import RouterWrap from "./Router";

const App = () => {
    return (
        <div className="wrapper">
            <RouterWrap />
            <GlobalStyled />
        </div>
    )
};

export default App;
