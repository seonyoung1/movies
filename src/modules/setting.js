import { createAction, handleActions } from "redux-actions";

//액션타입정의 :
const PAGE_SET = "setting/PAGE_SET";
const GET_CONTENTS = "setting/GET_CONTENTS";

export const pageSet = createAction(PAGE_SET, number => number);
export const getContents = createAction(GET_CONTENTS, contents => contents );

const initialState = {
    index: 0,
    page: 1,
    contents: [],
};

export default handleActions({
    [GET_CONTENTS]: (state, action) => ({
        ...state,
        contents: state.contents.concat(action.payload),
        index: state.index + 1
    }),
    [PAGE_SET]: (state, action) => ({
        ...state,
        page: action.payload
    }),

}, initialState);