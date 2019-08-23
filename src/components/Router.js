import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import HomeContainer from "../containers/HomeContainer";
import DetailContainer from "../containers/DetailContainer"
import SearchContainer from "../containers/SearchContainer";
import Header from "./Header";
import ScrollToTop from "../containers/ScrollToTop";

const RouterWrap = () => {
    return(
        <Router>
            <>
                <Header />
                <Switch>
                    <ScrollToTop>
                        <Route path="/" exact component={HomeContainer} />
                        <Route path="/detail/:id" exact component={DetailContainer} />
                        <Route path="/search" component={SearchContainer} />
                        {/*해당하는게 없으면 / 로 리다이렉트*/}
                        <Redirect from="*" to="/" />
                    </ScrollToTop>
                </Switch>
            </>
        </Router>
    )
};

export default RouterWrap;