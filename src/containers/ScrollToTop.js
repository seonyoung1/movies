import React, { useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as setActions from "../modules/setting";

const ScrollToTop = ({ children, location: { pathname }, homePos, SetActions, prevPath }) => {
    useEffect(() => {
        if( pathname === "/" ){
            if( prevPath !== "" && prevPath !== "/search" ){
                console.log(`스크롤 이동 ${homePos}`);
                scroll.scrollTo(homePos,{
                    duration: 0,
                });
            }
        }
        // console.log(`pathname ${pathname} // homePos ${homePos}`);
        SetActions.memoryPass(pathname);
    }, [pathname]);
    return children || null;
};

const mapStateToProps = ({setting}) => ({
    prevPath: setting.prevPath,
    homePos: setting.homePos,
});
const mapDispatchToProps = dispatch => ({
    SetActions: bindActionCreators(setActions, dispatch)
});

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(ScrollToTop);