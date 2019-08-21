import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as setActions from "../modules/setting";
import { moviesApi } from "../api";
import Home from "../components/Home";

class HomeContainer extends Component {
    constructor(props) {
        super(props);
        const { contents } = this.props;
        if( contents.length > 0 ) {
            this.state = {
                dataListId: contents[contents.length - 1].id
            };
        }
        this.scrollerRef = React.createRef();
    }

    state = {
        isLoading: true,
        loading:false,
        movies: [],
        error: null,
        playPage: 1, //현재 호출번호
        apiPage: 0, //api 호출할 때 가져오는 page 번호
        apiListId: 0,
        timer : null,
        // scroll1 : 0,
        // scroll2 : 0
    };

    componentDidMount() {
        this.nowPlayingList(this.state.playPage);
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    nowPlayingList = async (number) => {
        try {
            const response = await moviesApi.nowPlaying(number);
            this.setState({ apiListId: response.data.results[response.data.results.length-1].id });
            this.setState({ apiPage: response.data.page });
            const { data: { results : movies }} = await moviesApi.nowPlaying(number);
            //console.log("첫로딩 목록 추가");
            this.setState({ movies });
            await this.getContent();
        } catch {
            this.setState({error: "영화 목록을 가져오는데 실패했습니다."})
        } finally {
            this.setState({isLoading: false});
        }
    };

    getContent = () => {
        const { SetActions } = this.props;
        const { dataListId, apiListId } = this.state;
        //apiPage : api 호출 시 불러오는 page
        //page : 스토어에 저장한 현재 까지 불러온 page
        //playPage : 실제로 호출하는 page number
        if( dataListId ===  apiListId){
            return
        }
        //console.log(`준비: api ${this.state.apiPage}, page ${this.props.page}, playPage ${this.state.playPage}`);
        if( this.state.apiPage !== ( this.props.page + 1 )){
            //console.log("조건이 맞지 않음");
            this.setState({ playPage: this.props.page });
            //SetActions.pageSet(this.props.page - 1); //빼야 제대로 실행
            //console.log(`재설정: api ${this.state.apiPage}, page ${this.props.page}, playPage ${this.state.playPage}`);
            return
        }
        SetActions.getContents(this.state.movies);
        SetActions.pageSet(this.state.apiPage); //스토어에 저장하는 page 번호는 중복체크할 때만 사용, 컨텐츠를 정상적으로 호출하면 해당번호 저장
    };

    handleScroll = () => {
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        let clientHeight = document.documentElement.clientHeight + 100;

        // this.setState({scroll1: Math.floor(scrollTop + clientHeight) });
        // this.setState({scroll2: scrollHeight});

        if( Math.floor(scrollTop + clientHeight) > scrollHeight ){
            if( !this.state.timer ){
                //alert(`스크롤 ${scrollTop + clientHeight}, ${scrollHeight}`);
                this.setState({ playPage: this.state.playPage + 1 });
                this.nowPlayingList(this.state.playPage);
                this.state.timer = setTimeout(() => {
                    this.setState({timer: null});
                }, 500);
            }
        }
    };

    render(){
        const { page, contents } = this.props;
        const { isLoading, error } = this.state;
        return(
            <>
                <Home
                    page={page}
                    movies={contents}
                    isLoading={isLoading}
                    error={error}
                />
                {/*<p style={{position:"fixed",top:"0px",left:"0px",color:"#fff",zIndex:"100"}}>{this.state.scroll1}, {this.state.scroll2}</p>*/}
            </>
        )
    }
}

const mapStateToProps = ({setting}) => ({
    page: setting.page,
    contents: setting.contents,
    leavePage: setting.leavePage,
});

const mapDispatchToProps = dispatch => ({
    SetActions: bindActionCreators(setActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeContainer);


// const HomeContainer = ({ page, SetActions }) => {
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [movies, setMovies] = useState([]);
//
//     useEffect(() => {
//         nowPlayingList();
//
//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);
//
//     const nowPlayingList = async () => {
//         try {
//             const { data: { results : result }} = await moviesApi.nowPlaying(page);
//             setMovies([...movies, ...result]);
//         } catch {
//             setError("영화 목록을 가져오는데 실패했습니다.")
//         } finally {
//             setIsLoading(false);
//         }
//     };
//
//     const handleScroll = () => {
//         let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
//         let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
//         let clientHeight = document.documentElement.clientHeight + 100 ;
//         if( scrollTop + clientHeight > scrollHeight ){
//             SetActions.pageSet(page + 1);
//             //console.log(`scroll : ${number}`);
//             nowPlayingList();
//         }
//     };
//
//     const pageSet = number => {
//         SetActions.pageSet(number);
//     };
//
//     return (
//         <Home
//             page={page}
//             movies={movies}
//             isLoading={isLoading}
//             error={error}
//             pageSet={pageSet}
//         />
//     );
// };