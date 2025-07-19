import React, { useState } from 'react'
import UserSettings from './AccountProfile/UserSettings'
import UserBookedTours from './Orders/UserBookedTours'

const UserProfilePage = () => {
    const [activeTab, setActiveTab] = useState('settings')

    return (
        <div className="mx-auto mt-10 min-h-[calc(100vh-100px)] w-full max-w-7xl px-4">
            <div className="grid grid-cols-4 gap-6">
                {/* Sidebar: chiếm 1 cột trong 4 cột => 1/4 */}
                <div className="col-span-1">
                    <div className="rounded-md bg-white p-4 shadow">
                        <ul className="space-y-4">
                            <li
                                className={`cursor-pointer rounded p-3 font-medium transition ${
                                    activeTab === 'settings'
                                        ? 'bg-blue-600 text-white shadow'
                                        : 'text-gray-800 hover:bg-gray-100'
                                }`}
                                onClick={() => setActiveTab('settings')}
                            >
                                Cài đặt tài khoản
                            </li>
                            <li
                                className={`cursor-pointer rounded p-3 font-medium transition ${
                                    activeTab === 'tours'
                                        ? 'bg-blue-600 text-white shadow'
                                        : 'text-gray-800 hover:bg-gray-100'
                                }`}
                                onClick={() => setActiveTab('tours')}
                            >
                                Tour đã đặt
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Nội dung chính: chiếm 3 cột => 3/4 */}
                <div className="col-span-3">
                    <div className="rounded-md bg-white p-6 shadow">
                        {activeTab === 'settings' && <UserSettings />}
                        {activeTab === 'tours' && <UserBookedTours />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfilePage
