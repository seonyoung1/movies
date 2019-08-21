import React, { useState, useEffect } from 'react';
import { moviesApi } from "../api";
import Detail from "../components/Detail";

const DetailContainer = ({ location, match, history }) => {
    //const pathname = location.pathname;
    const pathId = match.params.id;
    const parsedId = parseInt(pathId);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    //console.log(`pathname: ${pathname}, pathId: ${pathId}, parsedId: ${parsedId}`);

    useEffect(() => {
        //id 가 숫자가 아니면 메인으로 보내버렷
        if( isNaN(parsedId)){
            return history.push("/");
        }

        handleContent();
        //window.scrollTo(0,0);
    }, []);

    const handleContent = async () => {
        try{
            const res = await moviesApi.movieDetail(parsedId);
            setResult(res.data);
        } catch {
            setError("컨텐츠를 찾을 수 없습니다");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Detail
            result={result}
            error={error}
            isLoading={isLoading}
            history={history}
        />
    );
};

export default DetailContainer;
