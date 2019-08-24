import axios from "axios"
import { cacheAdapterEnhancer } from "axios-extensions";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params: {
        api_key: "6f26edc26d6ed9d164d9bc332258be3f",
        language: "en-US"
    },
    adapter: cacheAdapterEnhancer(axios.defaults.adapter, {enabledByDefault: false})
});

export const moviesApi = {
    nowPlaying: page => api.get("movie/now_playing",{
        params: {
            page: page
        },
        cache: true
    }),
    popular: page => api.get("movie/popular",{
        params: {
            page: page
        },
        cache: true
    }),
    search: term => api.get("search/movie",{
        params: {
            api_key: "6f26edc26d6ed9d164d9bc332258be3f",
            query: encodeURI(term)
        },
        cache: true
    }),
    movieDetail: id => api.get(`movie/${id}&append_to_response=videos`, {
        params: {
            api_key: "6f26edc26d6ed9d164d9bc332258be3f",
            append_to_response: "videos"
        },
        cache: true
    }),
};