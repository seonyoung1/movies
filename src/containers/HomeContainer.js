import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as setActions from "../modules/setting";
import { moviesApi } from "../api";
import Home from "../components/Home";

const useScroll = () => {
    const [isBottom, setIsBottom] = useState(true);
    const [pos, setPos] = useState(0);

    const handleScroll = () => {
        setPos(window.scrollY);

        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        let clientHeight = document.documentElement.clientHeight + 100;
        if( Math.floor(scrollTop + clientHeight) > scrollHeight ){
            setIsBottom(true);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return [isBottom, setIsBottom, pos];
};

const HomeContainer = ({ SetActions, page, lastId, contents, posY }) => {
    const [isBottom, setIsBottom, pos] = useScroll();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    //const [apiPage, setApiPage] = useState(0);
    const [apiLastId, setApiLastId] = useState(null);
    const [playPage, setPlayPage] = useState(1);

    const [saveY] = useState(posY);
    let timer;

    useEffect(() => {
        console.log(`출력 ${posY} // ${saveY}`);
        let number = Number(saveY);
        window.scrollTo(0,1000);
    }, []);

    useEffect(() => {
        if ( isBottom ){
            nowPlayingList(playPage);
            if( ! timer ){
                setPlayPage(playPage + 1);
                timer = setTimeout(() => {
                    timer = null;
                    setIsBottom(false);
                }, 500);
            }
        }
    }, [isBottom]);

    useEffect(() => {
        if( movies.length > 0 ){
            //console.log(`movies change`);
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
            saveData();
        }
    }, [movies]);

    const nowPlayingList = async (number) => {
        try{
            const res = await moviesApi.nowPlaying(number);
            let apiLastIdSave = res.data.results[res.data.results.length-1].id; //api 마지막 번호 가져오기 (중복체크)
            let movie = res.data.results;
            setApiLastId(apiLastIdSave);
            //setApiPage(res.data.page);
            setMovies([...movie]);
        } catch {
            setError("Failed");
        } finally {
            setIsLoading(false);
        }
    };

    const saveData = () => {
        SetActions.getContents(movies);
        SetActions.pageSet(playPage - 1);
        SetActions.contentsLastId();
    };

    const savePos = () => {
        SetActions.savePosY(pos);
        //console.log(pos)
    };

    return(
        <Home
            movies={contents}
            isLoading={isLoading}
            error={error}
            savePos={savePos}
        />
    )
};

const mapStateToProps = ({setting}) => ({
    page: setting.page,
    contents: setting.contents,
    lastId: setting.lastId,
    posY: setting.posY,
});

const mapDispatchToProps = dispatch => ({
    SetActions: bindActionCreators(setActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeContainer);