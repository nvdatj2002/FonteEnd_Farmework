import { ACTION } from "./ACTION";


export const reducerSearch = (state, action) => {
    let newState
    switch (action.type) {
        case ACTION.SET_SEARCH: {
            const search = action.payload;
            newState = {
                ...state,
                search: search
            }
            break
        }
        default: {
            throw new console.error("lỗi");
        }
    }
    console.log('', newState)
    return newState
}