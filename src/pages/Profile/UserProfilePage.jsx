import React, { useState } from 'react';
import UserSettings from './AccountProfile/UserSettings';
import UserBookedTours from './Orders/UserBookedTours';

const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState('settings');

  return (
    <div className="w-full max-w-7xl mx-auto mt-10 px-4">
      <div className="grid grid-cols-4 gap-6">
        {/* Sidebar: chiếm 1 cột trong 4 cột => 1/4 */}
        <div className="col-span-1">
          <div className="bg-white shadow rounded-md p-4">
            <ul className="space-y-4">
              <li
                className={`cursor-pointer p-3 rounded transition font-medium ${
                  activeTab === 'settings'
                    ? 'bg-blue-600 text-white shadow'
                    : 'hover:bg-gray-100 text-gray-800'
                }`}
                onClick={() => setActiveTab('settings')}
              >
                Cài đặt tài khoản
              </li>
              <li
                className={`cursor-pointer p-3 rounded transition font-medium ${
                  activeTab === 'tours'
                    ? 'bg-blue-600 text-white shadow'
                    : 'hover:bg-gray-100 text-gray-800'
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
          <div className="bg-white shadow rounded-md p-6">
            {activeTab === 'settings' && <UserSettings />}
            {activeTab === 'tours' && <UserBookedTours />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
