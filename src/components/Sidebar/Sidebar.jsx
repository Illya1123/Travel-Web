import React from 'react'
import { MdOutlineTravelExplore } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

// Import Icons Here
import TourIcon from '../../Assets/icons/sidebar/tour.svg'
import TourSelectedIcon from '../../Assets/icons/sidebar/tour_selected.svg'
import TicketIcon from '../../Assets/icons/sidebar/ticket.svg'
import TicketSelectedIcon from '../../Assets/icons/sidebar/ticket_selected.svg'
import CustomerIcon from '../../Assets/icons/sidebar/customer.svg'
import CustomerSelectedIcon from '../../Assets/icons/sidebar/customer_selected.svg'

const Sidebar = () => {
    const linkStyles = ({ isActive }) =>
        `item-center flex flex-wrap px-4 py-4 text-left text-xl ${
            isActive
                ? 'bg-gradient-to-tr from-[#10b5cb] to-[#0073a8] font-bold text-yellow-100 hover:bg-gradient-to-tr hover:from-[#0073a8] hover:to-[#10b5cb]'
                : 'group transform-gpu text-gray-700 transition-all duration-300 ease-in-out hover:bg-cyan-100 hover:text-cyan-500'
        }`

    return (
        <div className="h-screen w-1/6 space-y-10 bg-white py-4 shadow-md">
            <a
                href="/"
                className="flex flex-col flex-wrap items-center text-center text-3xl font-semibold text-[#0073a8] transition-colors duration-300 hover:text-[#48acda]"
            >
                <MdOutlineTravelExplore />
                <h1>Travel</h1>
            </a>
            <NavLink to="/staff/tours" className={linkStyles}>
                {({ isActive }) => (
                    <>
                        <img
                            className="mr-4 h-8 w-8"
                            src={isActive ? TourSelectedIcon : TourIcon}
                            alt="Icon Chuyến đi"
                        />
                        <span className="scale w-fit bg-gradient-to-r from-[#10b5cb] to-[#0073a8] bg-[length:0%_3px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out group-hover:bg-[length:100%_3px]">
                            Chuyến Đi
                        </span>
                    </>
                )}
            </NavLink>
            <NavLink to="/staff/tickets" className={linkStyles}>
                {({ isActive }) => (
                    <>
                        <img
                            className="mr-4 h-8 w-8"
                            src={isActive ? TicketSelectedIcon : TicketIcon}
                            alt="Icon Chuyến đi"
                        />
                        <span className="w-fit bg-gradient-to-r from-[#10b5cb] to-[#0073a8] bg-[length:0%_3px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out group-hover:bg-[length:100%_3px]">
                            Đặt Vé
                        </span>
                    </>
                )}
            </NavLink>
            <NavLink to="/staff/customers" className={linkStyles}>
                {({ isActive }) => (
                    <>
                        <img
                            className="mr-4 h-8 w-8"
                            src={isActive ? CustomerSelectedIcon : CustomerIcon}
                            alt="Icon Chuyến đi"
                        />
                        <span className="w-fit bg-gradient-to-r from-[#10b5cb] to-[#0073a8] bg-[length:0%_3px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out group-hover:bg-[length:100%_3px]">
                            Khách Hàng
                        </span>
                    </>
                )}
            </NavLink>
        </div>
    )
}

export default Sidebar
