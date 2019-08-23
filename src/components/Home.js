import React from 'react';
import styled from "styled-components";
import Loader from "./Loader";
import Poster from "./Poster";

const Container = styled.div`
    width:100%;max-width:768px;margin:0 auto;padding:0 20px;
    .grid{
        display:block;
        :after{
            content:"";display:block;clear:both;
        }
    }
`;

const Home = ({ movies, isLoading, savePos }) => {
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
                                    savePos={savePos}
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
