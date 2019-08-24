import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import searchIcon from "../assets/images/search.png";
import MenuIcon from "../assets/images/menu.png";
import CloseIcon from "../assets/images/close.png";

const HeaderBox = styled.div`
    position:fixed;left:0;top:0;width:100%;height:50px;background-color:rgba(0,0,0,.85);box-shadow:0 0 5px rgba(0,0,0,.3);z-index:10;
    div{
        position:relative;width:100%;height:100%; max-width:768px; margin:0 auto; padding:0 20px;
    }
    h1{
        display:inline-block;font-family: 'Lexend Deca', sans-serif; color:#fff; font-size:21px; height:100%;
        a{
            display:block;width:100%;height:100%;padding-top:10px;padding-right:10px;color:#fff;text-decoration: none;
        }
    }
`;
const SearchBtn = styled(Link)`
    position:absolute;right:50px;top:0;width:50px;height:50px;color:#fff;font-size:0;
    :after{
        content:"";position:absolute;left:50%;top:50%;width:25px;height:25px;transform:translate(-50%,-50%);
        background:url(${searchIcon}) no-repeat center;background-size:100% auto;
    }
`;
const MenuBtn = styled.button`
    position:absolute;right:0;top:0;width:50px;height:50px;color:#fff;font-size:0;
    :after{
        content:"";position:absolute;left:50%;top:50%;width:25px;height:25px;transform:translate(-50%,-50%);
        background:url(${MenuIcon}) no-repeat center;background-size:100% auto;
    }
    ${props => {
        if( props.navIsOpen ){
            return `
                :after{background-image:url(${CloseIcon});width:20px;height:20px;}
            `
        }
    }}
`;

const Header = ({onCheckScrollToTop, onToggleNav, navIsOpen}) => {
    return (
        <HeaderBox>
            <div>
                <h1><Link to="/" onClick={onCheckScrollToTop}>MOVIES</Link></h1>
                <SearchBtn to="/search">Search</SearchBtn>
                <MenuBtn onClick={onToggleNav} navIsOpen={navIsOpen}>Menu</MenuBtn>
            </div>
        </HeaderBox>
    );
};

export default Header;
