import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loader from "./Loader";
import empty from "../assets/images/empty.jpg"

const Container = styled.div`
    width:100%;max-width:768px;margin:0 auto;padding:0 20px;
    .grid{
        li{
            float:left; width:33.3%; padding:10px; margin-bottom:10px;
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
        }
    }
`;

const Poster = ({ id, url, title, originTitle }) => {
    return(
        <li>
            <Link to={`/movie/${id}`}>
                <div className="poster">
                    { url !== null ? <img src={`https://image.tmdb.org/t/p/w500${url}`} alt={originTitle} /> : <img src={empty} alt="" />}
                </div>
                <div className="title">
                    <p className="original">{originTitle}</p>
                    <p className="eng">{title}</p>
                </div>
            </Link>
        </li>
    )
};

const Home = ({ movies, isLoading }) => {
    //console.log(movies);
    return (
        <Container>
            {isLoading ? <Loader /> :
                <>
                    {movies && movies.length > 0 &&
                        <ul className="grid">
                            {movies.map(item => (
                                <Poster
                                    key={item.id}
                                    id={item.id}
                                    url={item.poster_path}
                                    originTitle={item.original_title}
                                    title={item.title}
                                />
                            ))}
                        </ul>
                    }
                </>
            }
        </Container>
    );
};

export default Home;
