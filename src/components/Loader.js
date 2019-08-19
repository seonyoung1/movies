import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    width:100%; height:calc( 100vh - 80px );
`;

export default () => <Container>Loading...</Container>;