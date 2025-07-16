import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'

const Layout = () => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: '100px' }}></div>
            <Outlet />
            <Footer />
            <df-messenger
                intent="WELCOME"
                chat-title="Travel"
                agent-id="a8d3811d-d50b-4196-8b3d-208a78e6bbe6"
                language-code="vi"
            ></df-messenger>
        </div>
    )
}

export default Layout
