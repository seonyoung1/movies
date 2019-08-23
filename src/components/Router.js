import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import HomeContainer from "../containers/HomeContainer_class";
import DetailContainer from "../containers/DetailContainer"
import SearchContainer from "../containers/SearchContainer";
import Header from "./Header";

class RouterWrap extends React.Component{
    render(){
        return(
            <Router>
                <>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={HomeContainer} />
                        <Route path="/detail/:id" exact component={DetailContainer} />
                        <Route path="/search" component={SearchContainer} />
                        {/*해당하는게 없으면 / 로 리다이렉트*/}
                        {/*<Redirect from="*" to="/" />*/}
                    </Switch>
                </>
            </Router>
        )
    }
}

export default RouterWrap;
