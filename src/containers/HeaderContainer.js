import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as setActions from "../modules/setting";
import * as popularActions from "../modules/popular";
import Header from "../components/Header";
import Navigation from "../components/Navigation";

const HeaderContainer = ({ SetActions, PopularActions, navIsOpen }) => {
    const onCheckScrollToTop = () => {
        SetActions.checkScrollToTop(true);
    };
    const onToggleNav = () => {
        //네비 켯다 껏다 toggle 값 저장
        SetActions.checkNavIsOpen();
    };
    const popularPageReset = () => {
        PopularActions.updateCurrentPage(1);
        PopularActions.updateStartEndPage(0, 5);
        onCheckScrollToTop();
    };
    //navIsOpen : true, false 값 props 로 전달 (네비 디자인에 사용)

    return (
        <>
            <Header
                navIsOpen={navIsOpen}
                onCheckScrollToTop={onCheckScrollToTop}
                onToggleNav={onToggleNav}
            />
            <Navigation
                navIsOpen={navIsOpen}
                popularPageReset={popularPageReset}
                onCheckScrollToTop={onCheckScrollToTop}
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
