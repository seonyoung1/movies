import React from 'react';
import { animateScroll as scroll } from 'react-scroll'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as popularActions from "../modules/popular";
import Page from "../components/Page";

const Pagination = ({ isLoading, pageSelect, PopularActions, current, start, end }) => {
    const per = 20; //보여지고 있는 리스트의 갯수
    const postCount = 500; //총 페이지
    const total = Math.ceil(postCount/per);
    const array = [];
    for (let i=0; i<total; i++){
        array.push(i+1);
    }
    const target = array.slice(start, end);

    const onStartEndPage = (start, end) => {
        PopularActions.updateStartEndPage(start, end);
    };
    const onCurrentPage = page => {
        PopularActions.updateCurrentPage(page);
        pageSelect(page);
        scroll.scrollTo(0,{
            duration: 500,
            delay: 400
        });
    };
    const onFirst = () => {
        if( current === 1 ) return alert("This is the first page");
        onCurrentPage(1);
        PopularActions.updateStartEndPage(0, 5);
    };
    const onEnd = () => {
        if( current === total ) return alert("This is the last page");
        onCurrentPage(total);
        PopularActions.updateStartEndPage(total-5, total);
    };

    const onPrevPage = () => {
        // console.log(`current ${current}, current % 5 ${current % 5}`);
        if( current === 1 ) return alert("This is the first page");
        if( current % 5 === 1 ){
            const s = start - 5;
            const e = end - 5;
            onStartEndPage(s,e);
        }
        onCurrentPage(current - 1);
    };

    const onNextPage = () => {
        if( current === total ) return alert("This is the last page");
        if( current % 5 === 0 ){
            const s = start + 5;
            const e = end + 5;
            onStartEndPage(s,e);
        }
        onCurrentPage(current + 1);
    };

    return (
        <>
            { ! isLoading &&
                <Page
                    target={target}
                    start={start}
                    current={current}
                    onCurrentPage={onCurrentPage}
                    onPrevPage={onPrevPage}
                    onNextPage={onNextPage}
                    onFirst={onFirst}
                    onEnd={onEnd}
                />
            }
        </>
    );
};

const mapStateToProps = ({popular}) => ({
    current: popular.current,
    start: popular.start,
    end: popular.end,
});

const mapDispatchToProps = dispatch => ({
    PopularActions: bindActionCreators(popularActions, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pagination);
