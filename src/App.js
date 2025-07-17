import { useEffect } from 'react'
// import { Routes, Route } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Modal from 'react-modal'
import SignUpForm from './components/auth/SignUpForm'
import SignInForm from './components/auth/SignInForm'
import Layout from './components/Layout'
import Home from './pages/Home/Home.jsx'
import UserSettings from './pages/Profile/AccountProfile/UserSettings.jsx'
import UserProfilePage from './pages/Profile/UserProfilePage.jsx'
import StaffManager from './components/Layout/staff.jsx'
import Detail from './pages/TourDetail/detail.jsx'
import PrivateRoute from './PrivateRoute.js'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/register', element: <SignUpForm /> },
            { path: '/login', element: <SignInForm /> },
            { path: '/home', element: <Home /> },
            { path: '/detail/:id', element: <Detail /> },

            // Các route cần đăng nhập đặt trong PrivateRoute
            {
                element: <PrivateRoute />,
                children: [{ path: '/profile', element: <UserProfilePage /> }],
            },
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
