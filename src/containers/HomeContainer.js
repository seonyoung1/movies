import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as setActions from "../modules/setting";
import { moviesApi } from "../api";
import List from "../components/List";

const useScroll = () => {
    const [isBottom, setIsBottom] = useState(true);
    let timer;
    const handleScroll = () => {
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        let clientHeight = document.documentElement.clientHeight + 500;
        if( Math.floor(scrollTop + clientHeight) > scrollHeight ){
            if( ! timer ){
                //setPlayPage(playPage + 1);
                timer = setTimeout(() => {
                    timer = null;
                    setIsBottom(false);
                }, 250);
            }
            setIsBottom(true);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return [isBottom, setIsBottom];
};

const HomeContainer = ({ SetActions, page, lastId, contents }) => {
    const [isBottom] = useScroll();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [apiLastId, setApiLastId] = useState(null);
    const [playPage, setPlayPage] = useState(1);

    useEffect(() => {
        if ( isBottom ){
            if( playPage === 1000 ) return alert("There is no more data");
            setPlayPage(playPage + 1);
            nowPlayingList(playPage);
        }
    }, [isBottom]);

    useEffect(() => {
        //상세페이지에서 뒤로 넘어왔을 때 중복 및 오류 방지
        if( movies.length > 0 ){
            if( apiLastId === lastId ){
                //console.log("key 중복!");
                return
            }
            if( playPage === page || playPage < page ){
                //console.log(`page 호출 중복 page ${page}, play ${playPage}`);
                setPlayPage(page + 2);
                return
            }
            //console.log(`movies save ${apiLastId}, ${lastId}, page ${page}, play ${playPage}`);
            SetActions.getContents(movies);
            SetActions.updatePage(playPage - 1);
            SetActions.contentsLastId();
        }
    }, [movies]);

    const nowPlayingList = async (number) => {
        try{
            const res = await moviesApi.nowPlaying(number);
            let apiLastIdSave = res.data.results[res.data.results.length-1].id; //api 마지막 번호 가져오기 (중복체크)
            let movie = res.data.results;
            setApiLastId(apiLastIdSave);
            setMovies([...movie]);
        } catch {
            setError("Failed");
        } finally {
            setIsLoading(false);
        }
    };

    const saveScrollPos = () => {
        SetActions.scrollPosHome(Math.ceil(window.scrollY));
    };

    return(
        <>
            <List
                movies={contents}
                isLoading={isLoading}
                error={error}
                saveScrollPos={saveScrollPos}
                pageTitle="Now Playing"
            />
            {/*<p style={{position:"fixed",top:"0px",left:"0px",color:"#fff",zIndex:"100"}}>{isBottom ? "true" : "false"}</p>*/}
        </>
    )
};

const mapStateToProps = ({setting}) => ({
    page: setting.page,
    contents: setting.contents,
    lastId: setting.lastId,
    homePos: setting.homePos,
});

const mapDispatchToProps = dispatch => ({
    SetActions: bindActionCreators(setActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeContainer);