import React from 'react'

const Header = ({ title }) => {
    return (
        <header className="fixed right-0 top-0 z-50 flex w-5/6 items-center justify-between bg-white p-4 shadow-md">
            <div className="flex w-full flex-wrap items-center justify-between">
                <div className="pl-8 text-2xl font-bold">{title}</div>
                <div className="flex flex-wrap space-x-6 pr-8">
                    <button className="text-gray-700">Avatar</button>
                    <button className="text-gray-700">Notification</button>
                </div>
            </div>
        </header>
    )
}

export default Header
