import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Breadcrumb = () => {
    const location = useLocation()

    // Determine the breadcrumb title for the current page
    const breadcrumbMap = {
        '/staff/tours': 'Chuyến Đi',
        '/staff/tickets': 'Đặt Vé',
        '/staff/customers': 'Khách Hàng',
    }

    const currentTitle = breadcrumbMap[location.pathname] || 'Chuyến Đi'

    return (
        <nav className="mb-4 flex items-center space-x-2 text-gray-700">
            <Link to="/" className="transition-colors duration-300 hover:text-blue-500">
                Trang Chủ
            </Link>
            <svg
                className="h-6 w-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 19 19"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L11.586 9 7.293 4.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                ></path>
            </svg>
            <Link to="/staff" className="transition-colors duration-300 hover:text-blue-500">
                Nhân Viên
            </Link>
            <svg
                className="h-6 w-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 19 19"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L11.586 9 7.293 4.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                ></path>
            </svg>
            <span className="font-bold text-blue-500 transition-colors duration-300">
                {currentTitle}
            </span>
        </nav>
    )
}

export default Breadcrumb
