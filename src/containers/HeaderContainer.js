import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as setActions from "../modules/setting";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import * as popularActions from "../modules/popular";

const HeaderContainer = ({ SetActions, PopularActions, navIsOpen }) => {
    const onCheckScrollToTop = () => {
        SetActions.checkScrollToTop(true);
    };
    const onToggleNav = () => {
        // setIsOpen( !isOpen );
        SetActions.checkNavIsOpen();
    };
    const popularPageReset = () => {
        PopularActions.updateCurrentPage(1);
        PopularActions.updateStartEndPage(0, 5);
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
                popularPageReset={popularPageReset}
            />
        </>
    );
};

const mapStateToProps = ({setting}) => ({
    scrollToTop: setting.scrollToTop,
    navIsOpen: setting.navIsOpen,
});

const mapDispatchToProps = dispatch => ({
    SetActions: bindActionCreators(setActions, dispatch),
    PopularActions: bindActionCreators(popularActions, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderContainer);
