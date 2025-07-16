import { SET_USER_NAME } from '../actions'

const initState = {
    name: '',
}

const nameReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_USER_NAME: {
            return {
                ...state,
                name: action.payload,
            }
        }
        default:
            return state
    }
}

export default nameReducer
