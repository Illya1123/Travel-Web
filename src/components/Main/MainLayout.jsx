import React from 'react'

const MainLayout = ({ headerRef, children }) => (
    <section className="w-full px-4 py-10 md:px-8 lg:px-16">
        <div className="mb-8 text-center">
            <h3 ref={headerRef} className="text-2xl font-bold text-gray-800 md:text-3xl">
                Địa điểm thu hút khách du lịch nhất
            </h3>
        </div>
        {children}
    </section>
)

export default MainLayout
