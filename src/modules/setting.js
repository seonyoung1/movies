import { createAction, handleActions } from "redux-actions";

//액션타입정의 :
const PAGE_SET = "setting/PAGE_SET";
const GET_CONTENTS = "setting/GET_CONTENTS";
const LAST_CONTENTS_KEY = "setting/LAST_CONTENTS_KEY";
const SCROLL_POS = "setting/SCROLL_POS";
const MEMORY_PATH = "setting/MEMORY_PATH";
const SCROLL_TO_TOP = "setting/SCROLL_TO_TOP";
const NAV_IS_OPEN = "setting/NAV_IS_OPEN";

export const pageSet = createAction(PAGE_SET, number => number); //List 불러온 page 저장
export const getContents = createAction(GET_CONTENTS, contents => contents ); //List contents 저장
export const contentsLastId = createAction(LAST_CONTENTS_KEY ); //List contents 의 불러온 컨텐츠 배열의 마지막 id 저장
export const scrollPos = createAction(SCROLL_POS, y => y ); //scrollY 값 저장
export const memoryPassName = createAction(MEMORY_PATH, text => text); //이전에 보고있던 location.passName (현재 페이지 바로 전)
export const checkScrollToTop = createAction(SCROLL_TO_TOP, value => value); //top 으로 이동할지, 보고있던 곳으로 이동할지 체크
export const checkNavIsOpen = createAction(NAV_IS_OPEN);

const initialState = {
    page: 0,
    pagePopular: 0,
    contents: [],
    lastId: 0,
    homePos: 0,
    prevPath: "",
    scrollToTop: false,
    navIsOpen: false,
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
    [MEMORY_PATH]: (state, action) => ({
        ...state,
        prevPath: action.payload
    }),
    [SCROLL_TO_TOP]: (state, action) => ({
        ...state,
        scrollToTop: action.payload
    }),
    [NAV_IS_OPEN]: (state, action) => ({
        ...state,
        navIsOpen: ! state.navIsOpen
    }),

}, initialState);