import React from 'react';
import Helmet from "react-helmet";
import styled from "styled-components";
import Loader from "./Loader";
import empty from "../assets/images/empty.jpg"
import star from "../assets/images/star.png";

const Container = styled.div`
    position:relative;width:100%;max-width:768px;margin:0 auto;padding:30px 20px 0;
    .go_home{
        padding:10px 15px;background-color:#576574;color:#fff;font-size:14px;border-radius:3px;
    }
    .group{margin:30px 0;text-align:center;}
    .info_wrap{display:flex;justify-content:space-between;width:100%;}
    .poster{
        width:200px;
        @media (max-width: 480px ){
            width:100px;
            img{width:100%;}
        }
    }
    .info{
        width:calc( 100% - 200px ); padding-left:20px;
        h1{font-size:24px;font-weight:bold;}
        .title_en{color:#888;font-size:14px;}
        @media (max-width: 480px ){
             width:calc( 100% - 100px );
        }
    }
    .meta{
        width:100%;
        p{padding-bottom:5px;}
        span{color:#666;}
        .dot{
            display:inline-block;width:5px;height:5px;background-color:#ccc;border-radius:50%;font-size:0;margin:2px 8px 0 8px;vertical-align:middle;
        }
    }
    .overview{
        padding:30px 0; border-bottom:1px solid #eee;
        h2{font-weight:bold;}
        p{padding:10px 0;}
    }
    .videos{
        width:100%; margin-top:20px;
        h2{font-weight:bold;}
        p{display:inline-block;padding:10px 15px;background-color:#ffb8b8;margin-top:20px;border-radius:10px 10px 0 0;}
        .youtube{
            position:relative;width:100%;height:0;padding-top:56.25%;
            iframe{position:absolute;left:0;top:0;width:100%;height:100%;}
        }
    }
`;

const Rank = styled.div`
    display:flex;margin:10px 0;
    .star{
        width:103px;height:16px;background:url(${star}) no-repeat;background-size:103px auto;margin-top:1px;
        .per{
            width:${props => props.star}%;height:100%;font-size:0;
            background:url(${star}) no-repeat 0 100%;background-size:103px auto;
        }
    }
    .text{
        margin-left:10px;color:#666;font-size:14px;
        span{color:#333;font-weight:bold;}
    }
`;

const Detail = ({ result, isLoading, error, history }) => {
    return (
        <>
            { isLoading ? (
                <Loader />
            ):(
                <>
                    <Helmet>
                        <title>{result.original_title} | MOVIES</title>
                    </Helmet>
                    <Container>
                        <div className="info_wrap">
                            <div className="poster">
                                { result.poster_path !== null ? <img src={`https://image.tmdb.org/t/p/w200${result.poster_path}`} alt={result.title} /> : <img src={empty} alt="" />}
                            </div>
                            <div className="info">
                                <h1>{result.original_title}</h1>
                                <p className="title_en">{result.title}</p>
                                <Rank star={result.vote_average * 10}>
                                    <div className="star">
                                        <div className="per">{result.vote_average * 10}%</div>
                                    </div>
                                    <p className="text"><span>{result.vote_average}</span> / 10</p>
                                </Rank>
                                <div className="meta">
                                    {result.genres && (
                                        <>
                                            <p className="genres">
                                                {result.genres.map((genre, index) => index === result.genres.length - 1
                                                    ? genre.name
                                                    : `${genre.name} / `
                                                )}
                                            </p>
                                        </>
                                    )}
                                    {result.production_countries[0] && (
                                        <p>{result.production_countries[0].name}</p>
                                    )}
                                    {result.release_date && (
                                        <p><span>release : </span> {result.release_date}</p>
                                    )}
                                    {result.runtime && (
                                        <p><span>runtime :</span> {result.runtime} min</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="overview">
                            <h2>♠ Overview</h2>
                            <p>{result.overview}</p>
                        </div>
                        { result.videos.results.length > 0 && (
                            <div className="videos">
                                <h2>♣ Videos</h2>
                                {result.videos.results.map((item, index) => index < 5
                                    ? (
                                        <div className="item" key={item.id}>
                                            <p>{item.name}</p>
                                            <div className="youtube" key={item.key}>
                                                <iframe src={`https://www.youtube.com/embed/${item.key}`} title={item.name}>
                                                </iframe>
                                            </div>
                                        </div>
                                    ) : (
                                        ""
                                    )
                                )}
                            </div>
                        )}
                        <div className="group">
                            <button className="go_home" onClick={() => history.goBack()}>BACK</button>
                        </div>

                    </Container>
                </>
            )}

        </>
    );
};

export default Detail;
