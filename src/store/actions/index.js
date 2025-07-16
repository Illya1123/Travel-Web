// auth action
export const SET_USER_TOKEN = 'SET_USER_TOKEN'
export const SET_USER_NAME = 'SET_USER_NAME'
export const SET_USER_ID = 'SET_USER_ID'
export const SET_IS_LOGIN = 'SET_IS_LOGIN'

export const setCurrentUserId = (id) => {
    return {
        type: SET_USER_NAME,
        payload: id,
    }
}

export const setCurrentUserName = (name) => {
    return {
        type: SET_USER_NAME,
        payload: name,
    }
}

export const setCurrentUserAction = (token) => {
    return {
        type: SET_USER_TOKEN,
        payload: token,
    }
}

export const setCurrentUserIsLogin = (isLogin) => {
    return {
        type: SET_IS_LOGIN,
        payload: isLogin,
    }
}
