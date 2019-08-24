import React, {useState} from 'react';
import Page from "../components/Page";

const Pagination = ({ isLoading, pageSelect }) => {
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(5);
    const [current, setCurrent] = useState(1);

    const per = 20;
    const postCount = 500;
    const total = Math.ceil(postCount/per);
    const array = [];
    for (let i=0; i<total; i++){
        array.push(i+1);
    }
    const target = array.slice(start, end);

    const updateStartEndPage = (start, end) => {
        setStart(start);
        setEnd(end);
    };
    const updateCurrentPage = page => {
        setCurrent(page);
        pageSelect(page);
    };

    const onPrevPage = () => {
        // console.log(`current ${current}, current % 5 ${current % 5}`);
        if( current === 1 ) return alert("This is the first page");
        if( current % 5 === 1 ){
            const s = start - 5;
            const e = end - 5;
            updateStartEndPage(s,e);
        }
        updateCurrentPage(current - 1);
    };

    const onNextPage = () => {
        if( current === total ) return alert("This is the last page");
        if( current % 5 === 0 ){
            const s = start + 5;
            const e = end + 5;
            updateStartEndPage(s,e);
        }
        updateCurrentPage(current + 1);
    };

    return (
        <>
            { ! isLoading &&
                <Page
                    target={target}
                    start={start}
                    current={current}
                    updateCurrentPage={updateCurrentPage}
                    onPrevPage={onPrevPage}
                    onNextPage={onNextPage}
                />
            }
        </>
    );
};

export default Pagination;
