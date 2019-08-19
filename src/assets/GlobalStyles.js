import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyled = createGlobalStyle`
    ${reset};
    @import url("https://cdn.jsdelivr.net/gh/theeluwin/NotoSansKR-Hestia@master/stylesheets/NotoSansKR-Hestia.css");
    *{
        box-sizing:border-box;
    }
    body{
        font-family:"Noto Sans Korean", sans-serif;
        font-size:16px;
        letter-spacing:-0.01em; line-height:1.4; -webkit-font-smoothing : antialiased;
    }
    input, select, textarea {
        vertical-align:middle;
        box-sizing:border-box;
        border-radius:0;
        font-family:"Noto Sans Korean", sans-serif;
        font-size:16px;
    }
    button {
        font-family:"Noto Sans Korean", sans-serif;
        box-sizing:border-box;
        padding:0;
        border:0;
        background:transparent;
        cursor:pointer
    }
`;

export default GlobalStyled;