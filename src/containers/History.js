import { useEffect } from 'react';
import { animateScroll as scroll, scroller } from 'react-scroll'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as setActions from "../modules/setting";
import * as popularActions from "../modules/popular";

const History = ({ children, location: { pathname }, SetActions, homePos, PopularPos, prevPath, scrollIsTop, navIsOpen }) => {

    useEffect(() => {
        if( pathname === "/" ){
            if( prevPath.includes("detail") && ! scrollIsTop ){
            //if( prevPath !== "" && prevPath !== "/popular" && prevPath !== "/search" && ! scrollIsTop ){
                // console.log(`스크롤 이동 ${homePos} / ${top}`);
                // 현재 보고있는 페이지가 / or /popular 일때, 이전에 넘어온 페이지가 detail 이고, top 으로 이동이 아니면 실행
                // scroll.scrollTo(homePos,{duration: 0,});
                // setTimeout(() => {
                //     scroll.scrollTo(homePos,{duration: 0,});
                // }, 20);

                //target 위치로 이동
                const resId = `el-${prevPath.split("/")[2]}`;
                setTimeout(() => {
                    scroller.scrollTo(resId,{duration: 0, offset: -60,});
                }, 20);
            }
        }
        if( pathname === "/popular" ){
            if( prevPath.includes("detail") && ! scrollIsTop ){
                // scroll.scrollTo(PopularPos,{duration: 300, delay:500});
                const resId = `el-${prevPath.split("/")[2]}`;
                setTimeout(() => {
                    scroller.scrollTo(resId,{duration: 0, offset: -60,});
                }, 20);
            }
        }
        // 현재 location.pathname 저장~
        // console.log(`pathname ${pathname} // homePos ${homePos}`);
        SetActions.updatePathName(pathname);

        // nav 가 열려있을 때 페이지가 바뀌면 닫힘, toggle 형식
        // console.log(navIsOpen);
        if( navIsOpen ){
            SetActions.checkNavIsOpen();
        }
    }, [pathname]);

    useEffect(() => {
        //h1 등 top 으로 이동해야하면, 이동하고나서(true 일때) false 로 변경+
        SetActions.checkScrollToTop(false);
    },[scrollIsTop]);

    return children || null;
};

const mapStateToProps = ({setting, popular}) => ({
    prevPath: setting.prevPath,
    homePos: setting.homePos,
    PopularPos: popular.PopularPos,
    scrollIsTop: setting.scrollIsTop,
    navIsOpen: setting.navIsOpen,
});
const mapDispatchToProps = dispatch => ({
    SetActions: bindActionCreators(setActions, dispatch),
    PopularActions: bindActionCreators(popularActions, dispatch),
});

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(History);