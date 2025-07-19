import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-md text-center">
        {/* 404 Number */}
        <h1 className="text-7xl font-bold text-indigo-600 leading-none">404</h1>

        {/* 404 Illustration */}
        <div className="w-full h-40 my-6 relative">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>

        {/* Content */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          Trang bạn đang tìm không tồn tại hoặc đã bị chuyển đến route khác
        </p>

        <button
          onClick={() => navigate('/')}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        >
          Quay về trang chủ
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage;
