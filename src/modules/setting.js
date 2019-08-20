import { createAction, handleActions } from "redux-actions";

//액션타입정의 :
const PAGE_SET = "setting/PAGE_SET";
const GET_CONTENTS = "setting/GET_CONTENTS";
const LEAVE_PAGE_SAVE = "setting/TOGGLE";

export const pageSet = createAction(PAGE_SET, number => number);
export const getContents = createAction(GET_CONTENTS, contents => contents );
export const leavePageSave = createAction(LEAVE_PAGE_SAVE, number => number );

const initialState = {
    index: 0,
    page: 1,
    contents: [],
    leavePage: 1,
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
    [LEAVE_PAGE_SAVE]: (state, action) => ({
        ...state,
        leavePage: action.payload,
    }),

}, initialState);