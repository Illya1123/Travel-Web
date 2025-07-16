import { SET_IS_LOGIN } from '../actions'

const initState = {
    isLogin: false,
}

const nameReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_IS_LOGIN: {
            return {
                ...state,
                isLogin: Boolean(action.payload),
            }
        }
        default:
            return state
    }
}

export default nameReducer
