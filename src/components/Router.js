import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import HeaderContainer from "../containers/HeaderContainer";
import HomeContainer from "../containers/HomeContainer";
import PopularContainer from "../containers/PopularContainer";
import DetailContainer from "../containers/DetailContainer"
import SearchContainer from "../containers/SearchContainer";
import History from "../containers/History";

const RouterWrap = () => {
    return(
        <Router>
            <History>
                <HeaderContainer />
                <Switch>
                    <Route path="/" exact component={HomeContainer} />
                    <Route path="/popular" component={PopularContainer} />
                    <Route path="/detail/:id" exact component={DetailContainer} />
                    <Route path="/search" component={SearchContainer} />
                    {/*해당하는게 없으면 / 로 리다이렉트*/}
                    <Redirect from="*" to="/" />
                </Switch>
            </History>
        </Router>
    )
};

export default RouterWrap;