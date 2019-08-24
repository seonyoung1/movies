import { createAction, handleActions } from "redux-actions";

const SCROLL_POS_POPULAR = "popular/SCROLL_POS";
const PAGE_UPDATE = "popular/PAGE_UPDATE";
const PAGE_START_END_UPDATE = "popular/PAGE_START_END_UPDATE";

export const updateCurrentPage = createAction(PAGE_UPDATE, number => number); //page 저장
export const updateStartEndPage = createAction(PAGE_START_END_UPDATE, ( start, end ) => ({ start, end }) );
export const scrollPosPopular = createAction(SCROLL_POS_POPULAR, y => y ); //scrollY 값 저장 Popular

const initialState = {
    PopularPos: 0,
    current: 1,
    start: 0,
    end: 5,
};

export default handleActions({
    [SCROLL_POS_POPULAR]: (state, action) => ({
        ...state,
        PopularPos: action.payload
    }),
    [PAGE_UPDATE]: (state, action) => ({
        ...state,
        current: action.payload
    }),
    [PAGE_START_END_UPDATE]: (state, action) => ({
        ...state,
        start: action.payload.start,
        end: action.payload.end,
    }),

}, initialState);