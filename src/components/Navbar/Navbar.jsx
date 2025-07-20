import React, { useState, useEffect } from 'react'
import { MdTravelExplore, MdModeOfTravel } from 'react-icons/md'
import { RiMenuLine } from 'react-icons/ri'
import { IoMdClose } from 'react-icons/io'
import { PiAirplaneTiltBold } from 'react-icons/pi'
import { LuHotel } from 'react-icons/lu'
import { IoCarSportOutline } from 'react-icons/io5'
import { FaRegNewspaper } from 'react-icons/fa6'
import { GoPeople } from 'react-icons/go'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    const isMobile = useMediaQuery({ maxWidth: 1440 })
    const isMidDesktop = useMediaQuery({ minWidth: 1441, maxWidth: 1680 })
    const isLargeDesktop = useMediaQuery({ minWidth: 1681 })

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isLoggedIn = useSelector((state) => state.isLoginReducer.isLogin)
    const name = useSelector((state) => state.nameReducer.name)

    const toggleNavbar = () => setOpen(!open)
    const closeNavbar = () => setOpen(false)

    const handleLogout = () => {
        localStorage.clear()
        dispatch({ type: '@INIT' })
        navigate('/')
    }

    const handleUserRedirect = () => navigate('/profile')

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 1)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navItems = [
        { id: 1, name: 'Du lịch', path: '/', icon: <MdModeOfTravel /> },
        { id: 2, name: 'Vé máy bay', path: '/ve-may-bay', icon: <PiAirplaneTiltBold /> },
        { id: 3, name: 'Khách sạn', path: '/khach-san', icon: <LuHotel /> },
        { id: 4, name: 'Thuê xe', path: '/thue-xe', icon: <IoCarSportOutline /> },
        { id: 5, name: 'Tin tức', path: '/tin-tuc', icon: <FaRegNewspaper /> },
        { id: 6, name: 'Về chúng tôi', path: '/ve-chung-toi', icon: <GoPeople /> },
    ]

    const windowWidth = window.innerWidth
    const isFullScreen = windowWidth < 768

    return (
        <div
            className={`fixed top-0 z-50 flex h-[100px] w-full items-center justify-between border-b px-4 transition-all duration-300 md:px-16 ${
                open
                    ? 'bg-white shadow-md'
                    : isScrolled
                      ? 'bg-white/90 shadow-md backdrop-blur'
                      : 'bg-transparent'
            }`}
        >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 text-2xl font-semibold text-sky-700">
                <MdTravelExplore size={36} />
                <span>Travel</span>
            </Link>

            {/* Desktop Nav */}
            {!isMobile && (
                <ul className="ml-8 flex gap-6 font-medium text-neutral-700">
                    {navItems.map((item) => (
                        <li key={item.id} onClick={closeNavbar}>
                            <Link
                                to={item.path}
                                className={`flex items-center rounded-full border border-transparent px-4 py-2 transition duration-200 ${
                                    location.pathname === item.path
                                        ? 'border-sky-700 bg-sky-50 text-sky-700'
                                        : 'text-neutral-700 hover:border-sky-700 hover:bg-sky-50 hover:text-sky-700'
                                } ${isMidDesktop ? 'gap-1 text-base' : 'gap-2 text-xl'}`}
                            >
                                {(isLargeDesktop || isMobile) && item.icon}
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}

            {/* Actions */}
            {!isMobile ? (
                <div className="flex items-center gap-4">
                    {!isLoggedIn ? (
                        <>
                            <button
                                className={`rounded-full bg-sky-100 text-sky-700 transition hover:bg-sky-200 ${
                                    isMidDesktop ? 'px-5 py-1 text-base' : 'px-6 py-2 text-xl'
                                }`}
                                onClick={() => navigate('/register')}
                            >
                                Đăng ký
                            </button>
                            <button
                                className={`rounded-full bg-neutral-800 text-white transition hover:bg-neutral-700 ${
                                    isMidDesktop ? 'px-5 py-1 text-base' : 'px-6 py-2 text-xl'
                                }`}
                                onClick={() => navigate('/login')}
                            >
                                Đăng nhập
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className={`font-medium text-sky-700 hover:underline ${
                                    isMidDesktop ? 'px-4 py-1 text-base' : 'px-4 py-2 text-xl'
                                }`}
                                onClick={handleUserRedirect}
                            >
                                Chào, {name}
                            </button>
                            <button
                                className={`rounded-full bg-red-600 text-white transition hover:bg-red-500 ${
                                    isMidDesktop ? 'px-5 py-1 text-base' : 'px-6 py-2 text-xl'
                                }`}
                                onClick={handleLogout}
                            >
                                Đăng xuất
                            </button>
                        </>
                    )}
                </div>
            ) : (
                <button onClick={toggleNavbar} className="text-neutral-700">
                    <RiMenuLine size={36} />
                </button>
            )}

            {/* Mobile Menu */}
            {isMobile && (
                <div
                    className={`fixed right-0 top-0 z-[1000] h-screen ${
                        isFullScreen ? 'w-full' : 'w-[384px]'
                    } flex flex-col bg-white transition-transform duration-300 ${
                        open ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    <div className="flex items-center justify-between border-b p-4">
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-2xl font-semibold text-sky-700"
                        >
                            <MdTravelExplore size={36} />
                            <span>Travel</span>
                        </Link>
                        <button onClick={closeNavbar}>
                            <IoMdClose size={36} className="text-red-600" />
                        </button>
                    </div>

                    <ul className="flex flex-col gap-4 p-4 text-xl font-medium text-neutral-800">
                        {navItems.map((item) => (
                            <li key={item.id} onClick={closeNavbar}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center gap-2 hover:text-sky-700 ${
                                        location.pathname === item.path ? 'text-sky-700' : ''
                                    }`}
                                >
                                    {item.icon}
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-auto flex flex-col gap-2 px-4 pb-6">
                        {!isLoggedIn ? (
                            <>
                                <button
                                    className="w-fit cursor-pointer px-6 py-2 text-xl text-neutral-800 hover:text-sky-700"
                                    onClick={() => {
                                        closeNavbar()
                                        navigate('/register')
                                    }}
                                >
                                    Đăng ký
                                </button>
                                <button
                                    className="w-fit cursor-pointer rounded-xl bg-neutral-800 px-6 py-2 text-xl text-white hover:bg-neutral-700"
                                    onClick={() => {
                                        closeNavbar()
                                        navigate('/login')
                                    }}
                                >
                                    Đăng nhập
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className="w-fit px-6 py-2 text-xl font-medium text-sky-700 hover:underline"
                                    onClick={() => {
                                        closeNavbar()
                                        handleUserRedirect()
                                    }}
                                >
                                    Chào, {name}
                                </button>
                                <button
                                    className="w-fit rounded-xl bg-red-600 px-6 py-2 text-xl text-white hover:bg-red-500"
                                    onClick={() => {
                                        closeNavbar()
                                        handleLogout()
                                    }}
                                >
                                    Đăng xuất
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar
