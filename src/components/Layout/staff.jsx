import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Tours from '../../pages/Staff/Tours'
import Tickets from '../../pages/Staff/Tickets'
import Customers from '../../pages/Staff/Customers'

const StaffManager = () => {
    return (
        <section className="flex bg-[#EDEDED]">
            <Sidebar />
            <div className="h-screen w-5/6 pt-[6rem]">
                <Routes>
                    <Route path="tours" element={<Tours />} />
                    <Route path="tickets" element={<Tickets />} />
                    <Route path="customers" element={<Customers />} />
                </Routes>
            </div>
        </section>
    )
}

export default StaffManager
