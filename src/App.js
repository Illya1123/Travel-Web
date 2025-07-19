import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Modal from 'react-modal'

import SignUpForm from './components/auth/SignUpForm'
import SignInForm from './components/auth/SignInForm'
import Layout from './components/Layout'
import StaffManager from './components/Layout/staff.jsx'
import ForgetPassword from './components/auth/ForgetPassword.jsx'
import ResetPassword from './components/auth/ResetPassword.jsx'

import Home from './pages/Home/Home.jsx'
import UserProfilePage from './pages/Profile/UserProfilePage.jsx'
import Detail from './pages/TourDetail/detail.jsx'
import OneStepCheckout from './pages/Payment/OneStepCheckoutPage.jsx'
import NotFoundPage from './pages/NotFound/NotFoundPage.jsx'

import PublicRoute from './PublicRoute.js'
import PrivateRoute from './PrivateRoute.js'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/home', element: <Home /> },
            { path: '/detail/:id', element: <Detail /> },
            { path: '/reset-password/:token', element: <ResetPassword /> },
            // Các route đã đăng nhập thì không được vào nữa đặt trong PublicRoute
            {
                element: <PublicRoute />,
                children: [
                    { path: '/login', element: <SignInForm /> },
                    { path: '/register', element: <SignUpForm /> },
                    { path: '/forgot-password', element: <ForgetPassword /> },
                ],
            },
            // Các route cần đăng nhập đặt trong PrivateRoute
            {
                element: <PrivateRoute />,
                children: [
                    { path: '/profile', element: <UserProfilePage /> },
                    { path: '/onestepcheckout', element: <OneStepCheckout /> },
                ],
            },
            { path: '*', element: <NotFoundPage /> },
        ],
    },
    {
        path: '/staff/*',
        element: <StaffManager />,
    },
])

function App() {
    useEffect(() => {
        Modal.setAppElement(document.getElementById('root'))
    }, [])
    return (
        <>
            <div className="App">
                <RouterProvider router={router} />
            </div>
        </>
    )
}

export default App
