import React from 'react';
import {Link} from "react-router-dom";
import { Element } from 'react-scroll'
import Dotdotdot from "react-dotdotdot";
import empty from "../assets/images/empty.jpg";
import styled from "styled-components";

const List = styled.li`
    float:left; width:25%; padding:10px; margin-bottom:10px;
    .poster{
        overflow:hidden;position:relative;width:100%;height:0;padding-top:150%;
    }
    .title{
        margin-top:5px; height:70px;
        .original{
            max-height:50px;overflow:hidden;
        }
        .eng{
            display:block;width:calc( 100% - 10px);overflow: hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px; color:#999;
        }
    }
    img{
        position:absolute;left:50%;top:50%;width:100%;transform: translate(-50%,-50%);
    }
    a{
        text-decoration: none; color:#000;
        :hover{
            color:#38ada9;
            img{
                width:105%; transition: all .3s ease;
            }
        }
    }
    @media ( max-width : 600px ){
        width:50%;
    }
`;

const Poster = ({ id, url, title, originTitle, saveScrollPos }) => {
    return(
        <List>
            <Element name={`el-${id}`} className={`el-${id}`}>
                <Link to={`/detail/${id}`} onClick={saveScrollPos}>
                    <div className="poster">
                        { url !== null ? <img src={`https://image.tmdb.org/t/p/w500${url}`} alt={originTitle} /> : <img src={empty} alt="" />}
                    </div>
                    <div className="title">
                        <Dotdotdot clamp={2}>
                            <p className="original">{originTitle}</p>
                        </Dotdotdot>
                        <p className="eng">{title}</p>
                    </div>
                </Link>
            </Element>
        </List>
    )
};

export default Poster;
