import { createAction, handleActions } from "redux-actions";

//액션타입정의 :
const PAGE_SET = "setting/PAGE_SET";
const GET_CONTENTS = "setting/GET_CONTENTS";
const LAST_CONTENTS_KEY = "setting/LAST_CONTENTS_KEY";
const SCROLL_POS = "setting/SCROLL_POS";
const MEMORY_PASS = "setting/MEMORY_PASS";

export const pageSet = createAction(PAGE_SET, number => number);
export const getContents = createAction(GET_CONTENTS, contents => contents );
export const contentsLastId = createAction(LAST_CONTENTS_KEY );
export const scrollPos = createAction(SCROLL_POS, y => y );
export const memoryPass = createAction(MEMORY_PASS, text => text);

const initialState = {
    page: 0,
    contents: [],
    lastId: 0,
    homePos: 0,
    prevPath: ""
};

export default handleActions({
    [GET_CONTENTS]: (state, action) => ({
        ...state,
        //contents: [...state.contents, ...action.payload ],
        contents: [...new Set([...state.contents, ...action.payload ])],
    }),
    [LAST_CONTENTS_KEY]: (state, action) => ({
        ...state,
        lastId: state.contents[state.contents.length - 1].id,
    }),
    [PAGE_SET]: (state, action) => ({
        ...state,
        page: action.payload
    }),
    [SCROLL_POS]: (state, action) => ({
        ...state,
        homePos: action.payload
    }),
    [MEMORY_PASS]: (state, action) => ({
        ...state,
        prevPath: action.payload
    }),

}, initialState);