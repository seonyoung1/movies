import React from 'react';
import styled from "styled-components";
import img from "../assets/images/loading.gif";

const Loading = styled.div`
    position:fixed;left:50%;top:50%;
    width:256px;height:34px;transform: translate(-50%,-50%);
`;

export default () => <Loading><img src={img} alt="로딩중" /></Loading>;