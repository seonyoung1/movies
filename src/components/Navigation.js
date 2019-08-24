import React from 'react';
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const activeStyle = {
    color: "#81ecec",
    fontWeight: "bold",
};
const Nav = styled.nav`
    position:fixed;left:0;top:0;z-index:9;
    width:100%;height:0;overflow:hidden;padding-top:50px;
    background-color:rgba(0,0,0,1);transition:height .5s ease;
    ul{
        max-width:768px;margin:0 auto;padding:30px 20px;
    }
    a{
        display:block;padding:15px 10px;border-bottom:1px solid #333;
        text-decoration:none;color:#ddd;
    }
    ${props => {
        if( props.navIsOpen ){
            return `height:100%;`
        }
    }}
`;

const Navigation = ({ navIsOpen, popularPageReset, onCheckScrollToTop }) => {
    return (
        <Nav navIsOpen={navIsOpen}>
            <ul>
                <li>
                    <NavLink to="/" exact activeStyle={activeStyle} onClick={onCheckScrollToTop}>Now Loading</NavLink>
                </li>
                <li>
                    <NavLink to="/popular" activeStyle={activeStyle} onClick={popularPageReset}>popular</NavLink>
                </li>
            </ul>
        </Nav>
    );
};

export default Navigation;
