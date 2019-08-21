import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
    width:100%;margin:50px 0;
    display:flex;
    justify-content: center;
`;

const Message = text => {
    return(
        <Container>
            {text}
        </Container>
    )
};

Message.prototype = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};

export default Message;