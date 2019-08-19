import { createAction, handleActions } from "redux-actions";

//액션타입정의 :
const MODE = "setting/MODE";

export const modeChange = createAction(MODE, current => current);

const initialState = {
    current: 0, //현재 선택된 탭 index
    contents: [],
    mode: "",
    isLoading: false
};

export default handleActions({
    [MODE]: (state, action) => ({
        ...state,
        mode: action.payload
    }),

}, initialState);