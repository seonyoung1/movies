import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as setActions from "../modules/setting";
import { moviesApi } from "../api";
import Home from "../components/Home";

const HomeContainer = ({ SetActions, page, contents }) => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [playPage, setPlayPage] = useState(1);
    const [apiPage, setApiPage] = useState(1);

    const [apiListId, setApiListId] = useState(0);
    const [dataListId] = useState(contents.length > 0 ? contents[contents.length - 1].id : 0);

    //console.log(`apiListId ${apiListId}`);

    const [timer, setTimer] = useState(null);

    //scroll Test 위해 남겨둠
    // const [scroll1, setScroll1] = useState(0);
    // const [scroll2, setScroll2] = useState(0);

    useEffect(() => {
        console.log(`dataListId ${dataListId}, apiListId ${apiListId}`);
        nowPlayingList(playPage);

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {

    }, [apiListId]);

    const nowPlayingList = async (number) => {
        try {
            const response = await moviesApi.nowPlaying(number);
            setApiListId(response.data.results[response.data.results.length-1].id);
            await setApiPage(response.data.page);
            const { data: { results : result }} = await moviesApi.nowPlaying(number);
            setMovies([...movies, ...result]);
            await handleContent();
        } catch {
            setError( "영화 목록을 가져오는데 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleContent = () => {
        //apiPage : api 호출 시 불러오는 page
        //page : 스토어에 저장한 현재 까지 불러온 page
        //playPage : 실제로 호출하는 page number
        console.log(`dataListId ${dataListId}, apiListId ${apiListId}`);
        if( dataListId ===  apiListId){
            //console.log("마지막 id가 같은가?");
            return
        }
        //console.log(`준비: api ${this.state.apiPage}, page ${this.props.page}, playPage ${this.state.playPage}`);
        if( apiPage !== ( page + 1 )){
            //console.log("조건이 맞지 않음");
            setPlayPage( page );
            //SetActions.pageSet(this.props.page - 1); //빼야 제대로 실행
            //console.log(`재설정: api ${this.state.apiPage}, page ${this.props.page}, playPage ${this.state.playPage}`);
            console.log("api 페이지와 저장소 페이지 비교");
            return
        }
        console.log("123");
        SetActions.getContents(movies);
        SetActions.pageSet(apiPage); //스토어에 저장하는 page 번호는 중복체크할 때만 사용, 컨텐츠를 정상적으로 호출하면 해당번호 저장
        console.log(contents);
    };

    const handleScroll = () => {
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        let clientHeight = document.documentElement.clientHeight + 100;

        // this.setState({scroll1: Math.floor(scrollTop + clientHeight) });
        // this.setState({scroll2: scrollHeight});

        if( Math.floor(scrollTop + clientHeight) > scrollHeight ){
            if( !timer ){
                //alert(`스크롤 ${scrollTop + clientHeight}, ${scrollHeight}`);
                setPlayPage(number => number+1);
                nowPlayingList(playPage);

                setTimer(setTimeout(() => {
                    setTimer(null);
                }, 500));

                // timer = setTimeout(() => {
                //     setTimer(null);
                // }, 500);
            }
        }
    };


    return(
        <>
            {/*{console.log(movies, contents)}*/}
            <Home
                page={page}
                movies={movies}
                isLoading={isLoading}
                error={error}
            />
            {/*<p style={{position:"fixed",top:"0px",left:"0px",color:"#fff",zIndex:"100"}}>{this.state.scroll1}, {this.state.scroll2}</p>*/}
        </>
    )

};

const mapStateToProps = ({setting}) => ({
    page: setting.page,
    contents: setting.contents,
});

const mapDispatchToProps = dispatch => ({
    SetActions: bindActionCreators(setActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeContainer);