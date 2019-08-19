import { createAction, handleActions } from "redux-actions";

//액션타입정의 :
const PAGE_SET = "setting/PAGE_SET";
const GET_CONTENTS = "setting/GET_CONTENTS";
const TOGGLE = "setting/TOGGLE";

export const pageSet = createAction(PAGE_SET, number => number);
export const getContents = createAction(GET_CONTENTS, contents => contents );
export const toggleFirst = createAction(TOGGLE);

const initialState = {
    index: 0,
    page: 1,
    contents: [],
    isFirst: true,
};

export default handleActions({
    [GET_CONTENTS]: (state, action) => ({
        ...state,
        contents: [...state.contents, ...action.payload ],
    }),
    [PAGE_SET]: (state, action) => ({
        ...state,
        page: action.payload
    }),
    [TOGGLE]: (state, action) => ({
        ...state,
        isFirst: ! state.isFirst
    }),

}, initialState);