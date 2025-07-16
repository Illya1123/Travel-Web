import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
    setCurrentUserAction,
    setCurrentUserName,
    setCurrentUserIsLogin,
} from '../../store/actions/index'

const AuthInitializer = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const isLogin = localStorage.getItem('isLogin') === 'true'
        const name = JSON.parse(localStorage.getItem('name'))
        const token = localStorage.getItem('accessToken')

        if (isLogin && token && name) {
            dispatch(setCurrentUserIsLogin(true))
            dispatch(setCurrentUserName(name))
            dispatch(setCurrentUserAction(token))
        }
    }, [dispatch])

    return null
}

export default AuthInitializer
