import { createAction, handleActions } from "redux-actions";

//액션타입정의 :
const PAGE_SET = "setting/PAGE_SET";
const GET_CONTENTS = "setting/GET_CONTENTS";
const LAST_CONTENTS_KEY = "setting/LAST_CONTENTS_KEY";
const POS_SCROLL = "setting/POS_SCROLL";

export const pageSet = createAction(PAGE_SET, number => number);
export const getContents = createAction(GET_CONTENTS, contents => contents );
export const contentsLastId = createAction(LAST_CONTENTS_KEY );
export const savePosY = createAction(POS_SCROLL, y => y );

const initialState = {
    page: 0,
    contents: [],
    lastId: 0,
    posY: 0,
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
    [POS_SCROLL]: (state, action) => ({
        ...state,
        posY: action.payload
    }),

}, initialState);