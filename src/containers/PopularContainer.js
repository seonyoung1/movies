import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as popularActions from "../modules/popular";
import {moviesApi} from "../api";
import List from "../components/List";
import Pagination from "./Pagination";

const PopularContainer = ({ PopularActions, current }) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [playPage, setPlayPage] = useState(current);

    useEffect(() => {
        popularList(playPage);
    }, [playPage]);

    const popularList = async (number) => {
        try{
            const { data: { results : result }} = await moviesApi.popular(number);
            setMovies([...result]);

        } catch {
            setError("Failed");
        } finally {
            setIsLoading(false);
        }
    };

    const pageSelect = number => {
        setPlayPage(number);
    };

    const saveScrollPos = () => {
        PopularActions.scrollPosPopular(Math.ceil(window.scrollY));
    };

    return (
        <>
            <List
                movies={movies}
                isLoading={isLoading}
                error={error}
                pageTitle="Popular Movies"
                saveScrollPos={saveScrollPos}
            />
            <Pagination
                pageSelect={pageSelect}
                isLoading={isLoading}
            />
        </>
    );
};

const mapStateToProps = ({popular}) => ({
    current: popular.current
});

const mapDispatchToProps = dispatch => ({
    PopularActions: bindActionCreators(popularActions, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PopularContainer);
