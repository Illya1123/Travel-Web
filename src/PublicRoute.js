import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PublicRoute = () => {
    const isLogin = useSelector((state) => state.isLoginReducer.isLogin)
    return isLogin ? <Navigate to="/" /> : <Outlet />
}

export default PublicRoute