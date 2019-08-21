import React from 'react';
import styled from "styled-components";
import Loader from "./Loader";
import Poster from "./Poster";

const Container = styled.div`
    width:100%;max-width:768px;margin:0 auto;padding:0 20px;
`;

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
