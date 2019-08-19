import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyled = createGlobalStyle`
    ${reset};
    @import url("https://fonts.googleapis.com/css?family=Roboto:400,500,700");
    @import url("https://cdn.jsdelivr.net/gh/theeluwin/NotoSansKR-Hestia@master/stylesheets/NotoSansKR-Hestia.css");
    @import url('https://fonts.googleapis.com/css?family=Lexend+Deca&display=swap');
    *{
        box-sizing:border-box;
    }
    body{
        font-family:"Roboto", "Noto Sans Korean", sans-serif;
        font-size:16px;
        letter-spacing:-0.01em; line-height:1.4; -webkit-font-smoothing : antialiased;
    }
    input, select, textarea {
        vertical-align:middle;
        box-sizing:border-box;
        border-radius:0;
        font-family:"Roboto", "Noto Sans Korean", sans-serif;
        font-size:16px;
    }
    button {
        font-family:"Roboto", "Noto Sans Korean", sans-serif;
        box-sizing:border-box;
        padding:0;
        border:0;
        background:transparent;
        cursor:pointer
    }
    .wrapper{
        padding:70px 0 50px;
    }
`;

export default GlobalStyled;