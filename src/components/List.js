import React from 'react';
import styled from "styled-components";
import Helmet from "react-helmet";
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
    h2{font-size:18px;padding:10px;font-weight:bold;}
`;

const List = ({ movies, isLoading, saveScrollPos, pageTitle }) => {
    return (
        <Container>
            {isLoading ? <Loader /> :
                <>
                    <Helmet>
                        <title>MOVIES</title>
                    </Helmet>
                    <h2>{pageTitle}</h2>
                    {movies && movies.length > 0 &&
                        <ul className="grid">
                            {movies.map(item => (
                                <Poster
                                    key={item.id}
                                    id={item.id}
                                    url={item.poster_path}
                                    originTitle={item.original_title}
                                    title={item.title}
                                    saveScrollPos={saveScrollPos}
                                />
                            ))}
                        </ul>
                    }
                </>
            }
        </Container>
    );
};

export default List;
