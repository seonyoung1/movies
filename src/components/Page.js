import React from 'react';
import styled from "styled-components";
import nextArrow from "../assets/images/right-arrow.png";
import prevArrow from "../assets/images/left-arrow.png";

const Pagination = styled.ul`
    display:flex;justify-content:center;width:100%;max-width:768px;margin:0 auto;
    button{display:flex;justify-content:center;margin:0 8px;width:20px;height:20px;border-radius:50%;}
    button img{width:15px;}
    .active button{font-weight:bold;background-color:#00cec9;color:#fff;}
`;


const Page = ({ target, start, current, updateCurrentPage, onPrevPage, onNextPage }) => {
    return (
        <Pagination>
            {/*<button>to first page</button>*/}
            <li>
                <button onClick={() => onPrevPage()}><img src={prevArrow} alt="to prev page" /></button>
            </li>
            {target.map((val, index) =>
                <li key={val} className={index === (current - start - 1) ? "active" : ""}>
                    <button onClick={() => updateCurrentPage(val)}>{val}</button>
                </li>
            )}
            <li>
                <button onClick={() => onNextPage()}><img src={nextArrow} alt="to next page" /></button>
            </li>
            {/*<button>to last page</button>*/}
        </Pagination>
    );
};

export default Page;
