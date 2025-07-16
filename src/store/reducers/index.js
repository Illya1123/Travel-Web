import { combineReducers } from 'redux'
import authReducer from './authReducer'
import nameReducer from './nameReducer'
import isLoginReducer from './isLoginReducer'

const appReducer = combineReducers({
    authReducer,
    nameReducer,
    isLoginReducer,
})

const rootReducer = (state, action) => {
    if (action.type === '@INIT') {
        // Xoá toàn bộ Redux state -> reset về initial
        return appReducer(undefined, { type: undefined })
    }

    return appReducer(state, action)
}

export default rootReducer
