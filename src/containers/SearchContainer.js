import React, {useState} from 'react';
import Search from "../components/Search";
import {moviesApi} from "../api";

const SearchContainer = () => {
    const [keyword, setKeyword] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [prevSearch, setPrevSearch] = useState("");

    const onSubmit = e => {
        e.preventDefault();
        if( keyword !== "" ){
            handleContent();
            //console.log(result);
        }
    };

    const onChange = e => {
        setKeyword(e.target.value);
    };

    const handleContent = async () => {
        setIsLoading(true);
        try{
            const res = await moviesApi.search(keyword);
            setResult(res.data.results);
            setPrevSearch(keyword);
        } catch {
            setError("검색 결과가 없습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Search
                keyword={keyword}
                prevSearch={prevSearch}
                result={result}
                error={error}
                isLoading={isLoading}
                onSubmit={onSubmit}
                onChange={onChange}
            />
        </>
    );
};

export default SearchContainer;
