import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as setActions from "../modules/setting";
import { moviesApi } from "../api";
import Home from "../components/Home";

const useScroll = () => {
    const [isBottom, setIsBottom] = useState(true);
    const handleScroll = () => {
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        let clientHeight = document.documentElement.clientHeight + 100;
        if( Math.floor(scrollTop + clientHeight) > scrollHeight ){
            setIsBottom(true);
            //console.log(`스크롤 //${isBottom}`);
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return [isBottom, setIsBottom];
};

const HomeContainer = ({ SetActions, page, lastId, contents }) => {
    const [isBottom, setIsBottom] = useScroll();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    let timer;

    useEffect(() => {
        console.log(contents);
        const getData = async (number) => {
            try{
                //setPlayPage(prev => prev + 1, () => console.log(playPage));
                const res = await moviesApi.nowPlaying(number);
                //console.log(res);
                //setApiPage(res.data.page); //api page 번호 저장
                //setMovies(res.data.results); //movies 에 데이터 저장
                let apiPage = res.data.page;
                let apiLastId = res.data.results[res.data.results.length-1].id; //api 마지막 번호 가져오기 (중복체크)

                //console.log(`체크 ${apiLastId} ${lastId}`);
                if( apiLastId === lastId ){
                    //console.log(`중복 ${apiLastId} ${lastId}`);
                    return
                }
                //console.log(`page ${page} // ${number} // ${apiPage}`);
                SetActions.getContents(res.data.results);
                SetActions.contentsLastId();
                SetActions.pageSet(apiPage);
            } catch {
                setError("Failed");
            } finally {
                setIsLoading(false);
            }
        };
        if ( isBottom ){
            //console.log(page + 1);
            if( ! timer ){
                getData(page + 1);
                timer = setTimeout(() => {
                    timer = null;
                    setIsBottom(false);
                }, 500);
            }
        }
    }, [isBottom]);

    return(
        <Home
            movies={contents}
            isLoading={isLoading}
            error={error}
        />
    )
};

const mapStateToProps = ({setting}) => ({
    page: setting.page,
    contents: setting.contents,
    lastId: setting.lastId,
});

const mapDispatchToProps = dispatch => ({
    SetActions: bindActionCreators(setActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeContainer);