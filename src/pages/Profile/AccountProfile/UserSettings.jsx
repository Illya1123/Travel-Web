import React, { useState, useEffect } from 'react';

const initialUser = {
  id: 'u123',
  firstName: 'Nguyễn',
  lastName: 'Văn A',
  email: 'nguyenvana@gmail.com',
  phone: '0987654321',
  gender: 'male',
  birthday: {
    day: 15,
    month: 7,
    year: 1995,
  },
  avatar: 'https://i.pravatar.cc/150?img=5',
};

const UserSettings = () => {
  const [user, setUser] = useState(initialUser);

  const handleChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  const handleBirthdayChange = (field, value) => {
    setUser({
      ...user,
      birthday: {
        ...user.birthday,
        [field]: parseInt(value),
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dữ liệu cập nhật:', user);
    alert('Cập nhật thông tin thành công (giả lập)');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 bg-white shadow rounded-md mt-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Cài đặt tài khoản</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <img
            src={user.avatar}
            alt="Avatar"
            className="w-28 h-28 rounded-full object-cover mb-2"
          />
          <input
            type="file"
            className="text-sm text-gray-600"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const url = URL.createObjectURL(file);
                setUser({ ...user, avatar: url });
              }
            }}
          />
        </div>

        {/* Name, Email */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Họ</label>
            <input
              type="text"
              value={user.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Tên</label>
            <input
              type="text"
              value={user.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* Phone + Gender */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Số điện thoại</label>
            <input
              type="text"
              value={user.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Giới tính</label>
            <select
              value={user.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>
        </div>

        {/* Birthday */}
        <div>
          <label className="block mb-1 font-medium">Ngày sinh</label>
          <div className="grid grid-cols-3 gap-2">
            <select
              value={user.birthday.day}
              onChange={(e) => handleBirthdayChange('day', e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            >
              {[...Array(31)].map((_, i) => (
                <option key={i + 1}>{i + 1}</option>
              ))}
            </select>
            <select
              value={user.birthday.month}
              onChange={(e) => handleBirthdayChange('month', e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Tháng {i + 1}
                </option>
              ))}
            </select>
            <select
              value={user.birthday.year}
              onChange={(e) => handleBirthdayChange('year', e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            >
              {[...Array(100)].map((_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
          >
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserSettings;
