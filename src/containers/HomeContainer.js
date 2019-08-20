import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as setActions from "../modules/setting";
import { moviesApi } from "../api";
import Home from "../components/Home";

class HomeContainer extends Component {

    state = {
        isLoading: true,
        prevMovies: [],
        movies: [],
        error: null,
        localPage: 1,
    };

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.nowPlayingList();
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        // 언마운트 될때에, 스크롤링 이벤트 제거
        window.removeEventListener("scroll", this.handleScroll);

        const { SetActions, page, leavePage } = this.props;
        SetActions.leavePageSave(page);
        console.log(leavePage);
    }

    nowPlayingList = async () => {
        try {
            const { SetActions, page } = this.props;
            SetActions.pageSet(page + 1);
            const { data: { results : movies }} = await moviesApi.nowPlaying(page);
            this.setState({movies});
            this.getContent();
        } catch {
            this.setState({error: "영화 목록을 가져오는데 실패했습니다."})
        } finally {
            this.setState({isLoading: false});
        }
    };

    handleScroll = () => {
        const { SetActions, page } = this.props;
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        let clientHeight = document.documentElement.clientHeight + 20 ;
        if( scrollTop + clientHeight > scrollHeight ){
            //SetActions.pageSet(page + 1);
            this.nowPlayingList();
        }
    };

    getContent = () => {
        const { SetActions } = this.props;
        SetActions.getContents(this.state.movies);
    };

    render(){
        const { page, contents } = this.props;
        const { movies, isLoading, error } = this.state;
        return(
            <Home
                page={page}
                movies={contents}
                isLoading={isLoading}
                error={error}
            />
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