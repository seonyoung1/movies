import React from 'react';
import styled from "styled-components";
import next from "../assets/images/right-arrow.png";
import prev from "../assets/images/left-arrow.png";
import first from "../assets/images/first-arrow.png";
import last from "../assets/images/last-arrow.png";

const Pagination = styled.ul`
    display:flex;justify-content:center;width:100%;max-width:768px;margin:0 auto;
    button{display:flex;justify-content:center;margin:0 8px;width:20px;height:20px;border-radius:50%;}
    button img{width:15px;}
    .active button{font-weight:bold;background-color:#00cec9;color:#fff;}
`;


const Page = ({ target, start, current, onCurrentPage, onPrevPage, onNextPage, onFirst, onEnd }) => {
    return (
        <Pagination>
            <button onClick={() => onFirst()}><img src={first} alt="to first page" /></button>
            <li>
                <button onClick={() => onPrevPage()}><img src={prev} alt="to prev page" /></button>
            </li>
            {target.map((val, index) =>
                <li key={val} className={index === (current - start - 1) ? "active" : ""}>
                    <button onClick={() => onCurrentPage(val)}>{val}</button>
                </li>
            )}
            <li>
                <button onClick={() => onNextPage()}><img src={next} alt="to next page" /></button>
            </li>
            <button onClick={() => onEnd()}><img src={last} alt="to last page" /></button>
        </Pagination>
    );
};

export default Page;
