import React, { useState, useEffect } from 'react';
import { moviesApi } from "../api";
import Detail from "../components/Detail";

const DetailContainer = ({ location, match, history }) => {
    const pathname = location.pathname;
    const pathId = match.params.id;
    const parsedId = parseInt(pathId);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    console.log(`pathname: ${pathname}, pathId: ${pathId}, parsedId: ${parsedId}`);

    useEffect(() => {
        //id 가 숫자가 아니면 메인으로 보내버렷
        if( isNaN(parsedId)){
            return history.push("/");
        }
        getContent();
    }, []);

    const getContent = async () => {
        try{
            const res = await moviesApi.movieDetail(parsedId);
            setResult(res.data);
        } catch {
            setError("컨텐츠를 찾을 수 없습니다");
        } finally {
            setIsLoading(true);
        }
    };

    return (
        <Detail
            result={result}
            error={error}
            isLoading={isLoading}
        />
    );
};

export default DetailContainer;
