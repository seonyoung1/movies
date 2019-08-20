import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import searchIcon from "../assets/images/search.png";

const HeaderBox = styled.div`
    position:fixed;left:0;top:0;width:100%;height:50px;background-color:rgba(0,0,0,.8);box-shadow:0 0 5px rgba(0,0,0,.3);z-index:10;
    div{
        position:relative;width:100%; max-width:768px; margin:0 auto; padding:10px 20px;
    }
    h1{
        font-family: 'Lexend Deca', sans-serif; color:#fff; font-size:21px;
    }
    a{
        color:#fff;text-decoration: none;
    }
    button{
        position:absolute;right:0;top:0;width:50px;height:50px;color:#fff;font-size:0;
        :after{
            content:"";position:absolute;left:50%;top:50%;width:25px;height:25px;transform:translate(-50%,-50%);
            background:url(${searchIcon}) no-repeat center;background-size:100% auto;
        }
    }
`;
const Button = styled(Link)`
        position:absolute;right:0;top:0;width:50px;height:50px;color:#fff;font-size:0;
        :after{
            content:"";position:absolute;left:50%;top:50%;width:25px;height:25px;transform:translate(-50%,-50%);
            background:url(${searchIcon}) no-repeat center;background-size:100% auto;
        }
`;

const Header = () => {
    return (
        <HeaderBox>
            <div>
                <h1><Link to="/">nowPlaying</Link></h1>
                <Button to="/search">Search</Button>
            </div>
        </HeaderBox>
    );
};

export default Header;
