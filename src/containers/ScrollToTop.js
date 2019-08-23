import React, { useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as setActions from "../modules/setting";

const ScrollToTop = ({ children, location: { pathname }, homePos, SetActions, prevPath, top, setTop }) => {

    useEffect(() => {
        if( pathname === "/" ){
            if( prevPath !== "" && prevPath !== "/search" && ! top ){
                // console.log(`스크롤 이동 ${homePos} / ${top}`);
                scroll.scrollTo(homePos,{duration: 0,});
                setTimeout(() => {
                    scroll.scrollTo(homePos,{duration: 0,});
                }, 20);
                // alert(homePos);
            }
        }
        // console.log(`pathname ${pathname} // homePos ${homePos}`);
        SetActions.memoryPass(pathname);
    }, [pathname]);

    useEffect(() => {
        setTop(false);
    },[top]);

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