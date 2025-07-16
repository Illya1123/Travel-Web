import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
    const isLogin = useSelector((state) => state.isLoginReducer.isLogin)
    return isLogin ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
