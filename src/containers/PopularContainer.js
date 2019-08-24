import React, {useState, useEffect} from 'react';
import {moviesApi} from "../api";
import List from "../components/List";
import Pagination from "./Pagination";

const PopularContainer = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [playPage, setPlayPage] = useState(1);

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

    return (
        <>
            <List
                movies={movies}
                isLoading={isLoading}
                error={error}
                pageTitle="Popular Movies"
            />
            <Pagination
                pageSelect={pageSelect}
                isLoading={isLoading}
            />
        </>
    );
};

export default PopularContainer;
