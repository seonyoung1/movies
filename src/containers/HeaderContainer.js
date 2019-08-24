import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as setActions from "../modules/setting";
import Header from "../components/Header";
import Navigation from "../components/Navigation";

const HeaderContainer = ({ SetActions, navIsOpen }) => {
    const onCheckScrollToTop = () => {
        SetActions.checkScrollToTop(true);
    };
    const onToggleNav = () => {
        // setIsOpen( !isOpen );
        SetActions.checkNavIsOpen();
    };

    return (
        <>
            <Header
                onCheckScrollToTop={onCheckScrollToTop}
                onToggleNav={onToggleNav}
                navIsOpen={navIsOpen}
            />
            <Navigation
                navIsOpen={navIsOpen}
            />
        </>
    );
};

const mapStateToProps = ({setting}) => ({
    scrollToTop: setting.scrollToTop,
    navIsOpen: setting.navIsOpen,
});

const mapDispatchToProps = dispatch => ({
    SetActions: bindActionCreators(setActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderContainer);
