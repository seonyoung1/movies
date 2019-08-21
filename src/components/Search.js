import React from 'react';
import styled from "styled-components";
import Loader from "./Loader";
import Poster from "./Poster";
import Helmet from "react-helmet";
import searchIcon from "../assets/images/search.png";

const Container = styled.div`
    position:relative;width:100%;max-width:768px;margin:0 auto;padding:30px 20px;
    form{
        position:relative;display:flex;width:100%;height:50px;
        border:1px solid #576574;
        button{
            position:relative;width:50px;height:100%;background-color:#576574;font-size:0;
            :after{
                content:"";position:absolute;left:50%;top:50%;width:20px;height:20px;transform:translate(-50%,-50%);
                background:url(${searchIcon}) no-repeat center;background-size:100% auto;
            }
        }
        input{width:calc( 100% - 40px );border:none;padding:0 20px;}
    }
    h1{
        font-size:24px;color:#999;padding:0 10px;
        span{color:#ff4757;font-weight:bold;}
    }
    .result{
        margin:30px 0;
    }
    .not_found{text-align:center;font-size:24px;margin:50px 0;}
`;

const Search = ({ onSubmit, onChange, keyword, result, isLoading, prevSearch }) => {
    return (
        <>
            <Helmet>
                <title>Search | MOVIES</title>
            </Helmet>
            <Container>
                <form onSubmit={onSubmit}>
                    <input type="text" name="keyword" value={keyword} onChange={onChange} placeholder="Please enter a search term" />
                    <button type="submit">Search</button>
                </form>
                { isLoading ? (
                    <Loader />
                ) : (
                <>
                    <div className="result">
                        { result && result.length > 0 && (
                            <>
                                <h1>Search Results for <span>{prevSearch}</span></h1>
                                {result && result.length > 0 &&
                                    <ul className="grid">
                                        {result.map(item => (
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
                        )}
                        {result && result.length === 0 &&
                            <p className="not_found">Sorry, no results were found</p>
                        }
                    </div>

                </>
            )}

            </Container>
        </>
    );
};

export default Search;
