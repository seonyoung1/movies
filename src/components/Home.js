import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loader from "./Loader";

const Container = styled.div`
    width:100%;max-width:768px;margin:0 auto;padding:0 20px;
    .grid{
        li{
            float:left; width:33.3%; padding:10px; margin-bottom:10px;
            .poster{
                position:relative;width:100%;height:0;padding-top:150%;
            }
            img{
                position:absolute;left:0;top:0;width:100%;
            }
            .title{
                margin-top:5px;height:50px;overflow:hidden;
            }
            a{
                text-decoration: none; color:#000;
                :hover{
                    color:#38ada9;
                }
            }
            @media ( max-width : 600px ){
                width:50%;
            }
        }
    }
`;

const Poster = ({ id, url, title }) => {
    return(
        <li>
            <Link to={`/movie/${id}`}>
                <div className="poster">
                    <img src={`https://image.tmdb.org/t/p/w500${url}`} alt="" />
                </div>
                <p className="title">{title}</p>
            </Link>
        </li>
    )
};

const Home = ({ movies, isLoading }) => {
    //console.log("Home~");
    console.log(movies, isLoading);
    return (
        <Container>
            <button>눌러보장</button>
            {isLoading ? <Loader /> :
                <>
                    {movies && movies.length > 0 &&
                        <ul className="grid">
                            {movies.map(item => (
                                <Poster
                                    key={item.id}
                                    id={item.id}
                                    url={item.poster_path}
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
